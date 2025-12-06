import { Router } from 'express';
import * as mupdf from 'mupdf';
import Tesseract from 'tesseract.js';
import { authMiddleware } from '../auth.js';
import { transcriptUpload, handleUploadError } from '../middleware/upload.middleware.js';
import { extractCourses } from '../ai/extractCourses.js';
import prisma from '../prisma/client.js';

const router = Router();

/**
 * Perform OCR on an image buffer
 * @param {Buffer} imageBuffer - PNG image buffer
 * @returns {Promise<string>} - Extracted text
 */
async function performOCR(imageBuffer) {
  const result = await Tesseract.recognize(imageBuffer, 'eng', {
    logger: (m) => {
      if (m.status === 'recognizing text') {
        console.log(`OCR progress: ${Math.round(m.progress * 100)}%`);
      }
    },
  });
  return result.data.text;
}

/**
 * Extract text content from PDF buffer using MuPDF
 * First tries text extraction, falls back to OCR for scanned documents
 * @param {Buffer} pdfBuffer - PDF file buffer
 * @returns {Promise<string>} - Extracted text
 */
async function extractTextFromPdf(pdfBuffer) {
  let doc = null;
  
  try {
    // Load PDF with MuPDF
    doc = mupdf.Document.openDocument(pdfBuffer, 'application/pdf');
    const pageCount = doc.countPages();
    
    console.log(`PDF loaded with MuPDF. Total pages: ${pageCount}`);
    
    let fullText = '';
    
    // First pass: try to extract embedded text
    console.log('Attempting text extraction from PDF...');
    for (let i = 0; i < pageCount; i++) {
      const page = doc.loadPage(i);
      const pageText = page.toStructuredText('preserve-whitespace').asText();
      fullText += pageText + '\n';
    }
    
    // If we got meaningful text, return it
    if (fullText.trim().length > 100) {
      console.log(`Text extraction successful. Extracted ${fullText.length} characters`);
      return fullText;
    }
    
    // Second pass: OCR for scanned/image-based PDFs
    console.log('PDF appears to be image-based, performing OCR...');
    fullText = '';
    
    for (let i = 0; i < pageCount; i++) {
      console.log(`Processing page ${i + 1}/${pageCount} with OCR...`);
      const page = doc.loadPage(i);
      
      // Render page to PNG at 150 DPI (good balance of quality and speed)
      const pixmap = page.toPixmap(
        mupdf.Matrix.scale(150 / 72, 150 / 72), // Scale for 150 DPI
        mupdf.ColorSpace.DeviceRGB,
        false, // no alpha
        true   // include annotations
      );
      
      const pngBuffer = pixmap.asPNG();
      console.log(`Page ${i + 1} rendered (${pngBuffer.length} bytes), starting text recognition...`);
      
      const pageText = await performOCR(Buffer.from(pngBuffer));
      fullText += pageText + '\n\n';
      console.log(`Page ${i + 1} complete, extracted ${pageText.length} characters`);
    }
    
    if (!fullText.trim()) {
      throw new Error('Could not extract text from PDF. Please ensure the document is readable.');
    }

    console.log(`OCR complete. Total extracted: ${fullText.length} characters`);
    return fullText;
  } catch (error) {
    console.error('PDF extraction error:', error);
    if (error.message.includes('Could not extract')) {
      throw error;
    }
    throw new Error(`Failed to parse PDF: ${error.message}`);
  }
}

/**
 * Validate extracted courses
 * @param {Object} result - Extraction result
 * @returns {Object} - Validated result
 */
function validateExtractionResult(result) {
  if (!result || !result.courses) {
    throw new Error('Invalid extraction result');
  }

  if (result.courses.length === 0) {
    throw new Error('No courses found in transcript. Please ensure the PDF contains course information with grades.');
  }

  return result;
}

/**
 * @route   POST /api/transcript/upload
 * @desc    Upload transcript PDF and extract courses
 * @access  Private (requires authentication)
 */
router.post(
  '/upload',
  authMiddleware,
  transcriptUpload.single('transcript'),
  handleUploadError,
  async (req, res) => {
    try {
      // Validate file exists
      if (!req.file) {
        return res.status(400).json({
          error: 'No file uploaded',
          details: 'Please select a PDF file to upload',
        });
      }

      console.log('Processing transcript upload:', {
        filename: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
      });

      // Step 1: Fetch user profile for context
      const user = await prisma.user.findUnique({
        where: { id: req.user.sub },
        select: {
          major: true,
          yearOfStudy: true,
          name: true,
        },
      });

      // Step 2: Extract text from PDF
      console.log('Step 1: Extracting text from PDF...');
      const rawText = await extractTextFromPdf(req.file.buffer);
      console.log(`Extracted ${rawText.length} characters from PDF`);

      // Step 3: Send to AI for course extraction with user profile context
      console.log('Step 2: Sending to AI for course extraction...');
      const extractionResult = await extractCourses(rawText, {
        major: user?.major || 'Unknown',
        yearOfStudy: user?.yearOfStudy || 'Unknown',
        name: user?.name || 'Student',
      });

      // Step 4: Validate result
      const validatedResult = validateExtractionResult(extractionResult);

      console.log(`Successfully extracted ${validatedResult.courses.length} courses`);

      res.json({
        success: true,
        courses: validatedResult.courses,
        meta: {
          filename: req.file.originalname,
          pageCount: rawText.split(/\f/).length, // Rough page count estimate
          courseCount: validatedResult.courses.length,
        },
      });
    } catch (error) {
      console.error('Transcript upload error:', {
        message: error.message,
        stack: error.stack,
      });

      // Determine appropriate status code
      let statusCode = 500;
      if (error.message.includes('empty') || error.message.includes('No courses found')) {
        statusCode = 422; // Unprocessable Entity
      } else if (error.message.includes('parse PDF')) {
        statusCode = 400;
      }

      res.status(statusCode).json({
        error: 'Failed to process transcript',
        details: error.message,
      });
    }
  }
);

export default router;

