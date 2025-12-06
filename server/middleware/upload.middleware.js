import multer from 'multer';
import path from 'path';

/**
 * File filter to only accept PDF files
 */
function pdfFileFilter(_req, file, cb) {
  const allowedMimes = ['application/pdf'];
  const allowedExts = ['.pdf'];

  const ext = path.extname(file.originalname).toLowerCase();
  const mimeOk = allowedMimes.includes(file.mimetype);
  const extOk = allowedExts.includes(ext);

  if (mimeOk && extOk) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
}

/**
 * Multer configuration for transcript uploads
 * - Stores files in memory (buffer)
 * - Max file size: 10MB
 * - Only accepts PDF files
 */
export const transcriptUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
    files: 1,
  },
  fileFilter: pdfFileFilter,
});

/**
 * Error handler middleware for multer errors
 */
export function handleUploadError(err, _req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File too large',
        details: 'Maximum file size is 10MB',
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        error: 'Too many files',
        details: 'Only one file can be uploaded at a time',
      });
    }
    return res.status(400).json({
      error: 'Upload error',
      details: err.message,
    });
  }

  if (err && err.message === 'Only PDF files are allowed') {
    return res.status(400).json({
      error: 'Invalid file type',
      details: 'Only PDF files are allowed',
    });
  }

  next(err);
}

export default transcriptUpload;

