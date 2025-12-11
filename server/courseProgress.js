import express from 'express';
import prisma from './prisma/client.js';
import { authMiddleware } from './auth.js';

const router = express.Router();

// Get all tracked courses grouped by year for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.sub;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const progress = await prisma.courseProgress.findMany({
      where: { userId },
      orderBy: [{ year: 'asc' }, { course: 'asc' }],
    });

    const grouped = progress.reduce((acc, item) => {
      if (!acc[item.year]) acc[item.year] = [];
      acc[item.year].push(item.course);
      return acc;
    }, {});

    res.json({ coursesByYear: grouped });
  } catch (error) {
    console.error('Failed to fetch course progress', error);
    res.status(500).json({ error: 'Failed to fetch course progress' });
  }
});

// Upsert courses for a specific year (replaces the set for that year)
router.put('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.sub;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { year, courses } = req.body || {};
    const parsedYear = Number(year);

    if (!parsedYear || Number.isNaN(parsedYear) || parsedYear < 1) {
      return res.status(400).json({ error: 'year must be a positive number' });
    }

    if (!Array.isArray(courses)) {
      return res.status(400).json({ error: 'courses must be an array of strings' });
    }

    const uniqueCourses = Array.from(
      new Set(
        courses
          .filter(c => typeof c === 'string')
          .map(c => c.trim())
          .filter(Boolean)
      )
    ).slice(0, 200); // basic guardrail

    // Replace all entries for that year
    await prisma.$transaction([
      prisma.courseProgress.deleteMany({ where: { userId, year: parsedYear } }),
      ...uniqueCourses.map(course =>
        prisma.courseProgress.create({
          data: { userId, year: parsedYear, course },
        })
      ),
    ]);

    const updated = await prisma.courseProgress.findMany({
      where: { userId },
      orderBy: [{ year: 'asc' }, { course: 'asc' }],
    });

    const grouped = updated.reduce((acc, item) => {
      if (!acc[item.year]) acc[item.year] = [];
      acc[item.year].push(item.course);
      return acc;
    }, {});

    res.json({ coursesByYear: grouped });
  } catch (error) {
    console.error('Failed to update course progress', error);
    res.status(500).json({ error: 'Failed to update course progress' });
  }
});

export default router;
