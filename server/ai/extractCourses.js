import axios from 'axios';
import config from '../config/index.js';

/**
 * Prompt template for extracting courses from transcript text
 */
const EXTRACTION_PROMPT = `You are an academic transcript parser.
Extract ALL completed courses and their final grades from the following text.
You MUST extract every single course listed in the transcript, including:
- Courses with letter grades (A, B+, B, B-, C+, C, C-, D, F)
- Courses with pass/fail grades (зачет, pass, satisfactory, etc.)
- Courses with 0 credits
- Courses with percentage grades
- Physical education courses
- All courses from all academic periods

Return ONLY valid JSON with no additional text, markdown, or explanation.

Required format:
{
  "courses": [
    {"title": "Course Name", "grade": "A"}
  ]
}

CRITICAL RULES:
- Extract EVERY course that appears in the transcript table
- Do NOT skip any courses, even if they have pass/fail or 0 credits
- Use the exact course titles as they appear in the transcript
- For letter grades: use the exact grade shown (A, A-, B+, B, B-, C+, C, C-, D, F)
- For pass/fail: use "Pass" or "зачет" or the exact term shown
- For percentage: convert to letter grade if possible, or keep percentage
- Include courses from ALL academic periods
- Count courses by their row number in the table
- If you see numbered courses (1, 2, 3...), extract ALL of them

IMPORTANT: The transcript may have 40+ courses. Extract ALL of them, not just a subset.

Transcript text:
`;

/**
 * Parse the AI response to extract JSON
 * @param {string} responseText - Raw response from AI
 * @returns {Object} - Parsed JSON object
 */
function parseAIResponse(responseText) {
  // Try to extract JSON from the response
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  
  if (!jsonMatch) {
    throw new Error('No JSON found in AI response');
  }

  try {
    const parsed = JSON.parse(jsonMatch[0]);
    
    // Validate structure
    if (!parsed.courses || !Array.isArray(parsed.courses)) {
      throw new Error('Invalid response structure: missing courses array');
    }

    // Validate each course
    parsed.courses = parsed.courses.filter((course) => {
      return course && 
             typeof course.title === 'string' && 
             typeof course.grade === 'string' &&
             course.title.trim() !== '' &&
             course.grade.trim() !== '';
    });

    return parsed;
  } catch (parseError) {
    throw new Error(`Failed to parse JSON: ${parseError.message}`);
  }
}

/**
 * Extract courses from transcript text using Dify AI
 * @param {string} text - Raw text extracted from PDF
 * @param {Object} userProfile - User profile information
 * @param {string} userProfile.major - User's major
 * @param {string} userProfile.yearOfStudy - User's year of study
 * @param {string} userProfile.name - User's name
 * @returns {Promise<{courses: Array<{title: string, grade: string}>}>}
 */
export async function extractCourses(text, userProfile = {}) {
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    throw new Error('No text provided for extraction');
  }

  if (!config.dify.apiKey) {
    throw new Error('AI API key not configured');
  }

  const query = `${EXTRACTION_PROMPT}${text.trim()}`;
  const url = `${config.dify.baseUrl}/chat-messages`;

  const payload = {
    inputs: {
      // Use user profile data if available, otherwise use defaults
      student_year: userProfile.yearOfStudy || 'Unknown',
      student_major: userProfile.major || 'Unknown',
      student_name: userProfile.name || 'Student',
    },
    query,
    response_mode: 'blocking',
    user: 'transcript-parser',
  };

  console.log('Sending transcript text to AI for parsing...');
  console.log('Text length:', text.length, 'characters');

  try {
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${config.dify.apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 120000, // 2 minutes for large transcripts
    });

    if (response.status >= 400) {
      throw new Error(`AI API error: ${response.status} - ${response.data?.message || 'Unknown error'}`);
    }

    const answer = response.data?.answer;
    if (!answer) {
      throw new Error('AI returned empty response');
    }

    console.log('AI response received, parsing JSON...');
    const result = parseAIResponse(answer);
    console.log(`Successfully extracted ${result.courses.length} courses`);
    
    // Warn if very few courses extracted (might indicate incomplete extraction)
    if (result.courses.length < 20 && text.length > 10000) {
      console.warn(`Warning: Only ${result.courses.length} courses extracted from a large transcript (${text.length} chars). This might be incomplete.`);
    }

    return result;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.message;
      throw new Error(`AI API error (${status}): ${message}`);
    } else if (error.request) {
      throw new Error('AI service unavailable. Please try again later.');
    }
    throw error;
  }
}

export default extractCourses;
