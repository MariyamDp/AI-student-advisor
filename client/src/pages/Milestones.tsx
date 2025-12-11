import './Milestones.css';
import { useEffect, useMemo, useState } from 'react';
import Sidebar from '../components/chat/Sidebar';
import ChatHeader from '../components/chat/ChatHeader';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Milestone {
  year: number;
  label: string;
  title: string;
  description: string;
  totalTasks: number;
}

type CourseCatalog = Record<
  string,
  {
    displayName: string;
    years: Record<number, string[]>;
  }
>;

const baseMilestones: Milestone[] = [
  {
    year: 1,
    label: 'Y1',
    title: 'Foundation',
    description: 'Build your academic foundation with core courses',
    totalTasks: 4,
  },
  {
    year: 2,
    label: 'Y2',
    title: 'Core & Prerequisites',
    description: 'Complete major requirements and prerequisites',
    totalTasks: 4,
  },
  {
    year: 3,
    label: 'Y3',
    title: 'Mobility / Double Degree',
    description: 'Explore international opportunities',
    totalTasks: 4,
  },
  {
    year: 4,
    label: 'Y4',
    title: 'Research & Graduation',
    description: 'Complete your capstone and graduate',
    totalTasks: 4,
  },
];

const clampYear = (value: number, maxYear: number) => Math.min(Math.max(value, 1), maxYear);

const normalizeMajor = (major?: string | null) => major?.replace(/\s+/g, ' ').trim().toLowerCase();

const courseCatalog: CourseCatalog = {
  'bba in it': {
    displayName: 'BBA in Information Technology',
    years: {
      1: [
        'English B1/B2',
        'Kazakh/Russian B1/B2',
        'Contemporary History',
        'Social-Political Knowledge I/II',
        'Philosophy',
        'Information & Communication Technologies',
        'Business Communications',
        'Organizational Behavior',
        'Academic Writing',
        'Research Methods',
        'Business Ethics',
        'Data Analysis I',
        'Calculus I',
        'Introduction to Economics',
        'Statistics',
        'Mathematics II',
        'Discrete Mathematics',
      ],
      2: [
        'Principles of Accounting',
        'Principles of Finance',
        'Principles of Management',
        'Principles of Marketing',
        'A Step to Graduate',
        'Introduction to Programming',
        'Web Development I',
        'Algorithms & Data Structures',
      ],
      3: [
        'Mobile Development I',
        'Information Security',
        'Web Development II',
        'Databases',
        'Machine Learning',
      ],
      4: [
        'Mobile Development II',
        'Data Analysis II',
        'Capstone Project',
        'Electives (Graphic Design, Networks, Software Dev, Probability & Statistics II, Game Dev, Project Management…)',
        'Internship',
        'State Exam / Thesis',
      ],
    },
  },
  'bba in accounting': {
    displayName: 'BBA in Accounting',
    years: {
      1: [
        'Contemporary History of Kazakhstan',
        'English B1',
        'Kazakh/Russian B1',
        'Social-Political Knowledge I',
        'Philosophy',
        'English B2',
        'Kazakh/Russian B2',
        'Social-Political Knowledge II',
        'Information & Communication Technologies',
      ],
      2: [
        'Business Communications',
        'Organizational Behavior',
        'Academic Writing',
        'Research Methods',
        'Business Ethics',
        'Data Analysis I',
        'Calculus I',
        'Introduction to Economics',
        'Statistics I',
        'Statistics II / Econometrics',
        'Microeconomics',
        'Macroeconomics',
        'Principles of Accounting',
        'Principles of Finance',
        'Principles of Management',
        'Principles of Marketing',
        'A Step to Graduate',
      ],
      3: [
        'Financial Accounting I',
        'Financial Accounting II',
        'Managerial Accounting I',
        'Taxation',
        'Audit',
        'Financial & Tax Reporting',
      ],
      4: [
        'Corporate & Business Law',
        'Business Ethics & Law',
        'Corporate Governance',
        'Finance & Law',
        'Information Technology in Business',
        'Human Resource Management',
        'Entrepreneurship & Innovation',
        'Internship',
        'Thesis / State Exam',
      ],
    },
  },
  'bba in finance': {
    displayName: 'BBA in Finance',
    years: {
      1: [
        'Contemporary History of Kazakhstan',
        'English B1/B2',
        'Kazakh/Russian B1/B2',
        'Social-Political Knowledge I/II',
        'Philosophy',
        'Information & Communication Technologies',
      ],
      2: [
        'Business Communications',
        'Organizational Behavior',
        'Academic Writing',
        'Research Methods',
        'Business Ethics',
        'Data Analysis I',
        'Calculus I',
        'Introduction to Economics',
        'Statistics I',
        'Econometrics',
        'Microeconomics',
        'Macroeconomics',
        'Principles of Accounting',
        'Principles of Finance',
        'Principles of Management',
        'Principles of Marketing',
        'Corporate Finance',
        'Strategic Management',
        'Financial Statement Analysis',
        'A Step to Graduate',
      ],
      3: [
        'Valuation',
        'Securities & Derivatives',
        'Financial Management',
        'Investment Management',
        'Bloomberg Market Concepts (BMC)',
        'Fixed Income Securities',
      ],
      4: [
        'Financial Institutions & Markets',
        'Financial Risk Management',
        'Corporate Governance',
        'Law electives',
        'Accounting electives',
        'Entrepreneurship',
        'PR / HRM / Supply Chain / Operations Mgmt',
        'Internship',
        'Thesis / State Exam',
      ],
    },
  },
  'bba in management': {
    displayName: 'BBA in Management',
    years: {
      1: [
        'Contemporary History of Kazakhstan',
        'English B1/B2',
        'Kazakh/Russian B1/B2',
        'Social-Political Knowledge I/II',
        'Philosophy',
        'Information & Communication Technologies',
      ],
      2: [
        'Business Communications',
        'Organizational Behavior',
        'Academic Writing',
        'Research Methods',
        'Business Ethics',
        'Data Analysis I',
        'Calculus I',
        'Statistics I',
        'Statistics II',
        'Introduction to Economics',
        'Microeconomics',
        'Macroeconomics',
        'Principles of Accounting',
        'Principles of Finance',
        'Principles of Management',
        'Principles of Marketing',
        'A Step to Graduate',
      ],
      3: [
        'Operations Management',
        'Strategic Management',
        'Organizational Leadership',
        'Human Resource Management',
        'Innovation Management',
        'Project Management',
      ],
      4: [
        'Supply Chain Management',
        'Entrepreneurship',
        'Data Analysis II',
        'Corporate Governance',
        'Business Ethics & Law',
        'Public Relations',
        'Marketing electives (cross-listed)',
        'Internship',
        'Thesis / State Exam',
      ],
    },
  },
  'bba in economics and data science': {
    displayName: 'BBA in Economics & Data Science',
    years: {
      1: [
        'Contemporary History of Kazakhstan',
        'English B1/B2',
        'Kazakh/Russian B1/B2',
        'Social-Political Knowledge I/II',
        'Philosophy',
        'Information & Communication Technologies',
      ],
      2: [
        'Calculus I',
        'Introduction to Economics',
        'Microeconomics I',
        'Macroeconomics I',
        'Statistics I',
        'Statistics II',
        'Business Communications',
        'Organizational Behavior',
        'Academic Writing',
        'Research Methods',
        'Business Ethics',
        'Data Analysis I',
        'Principles of Accounting',
        'Principles of Finance',
        'Principles of Management',
        'Principles of Marketing',
        'A Step to Graduate',
      ],
      3: [
        'Econometrics',
        'Microeconomics II',
        'Macroeconomics II',
        'Global Economic Policy / Development Economics',
        'Data Analysis II',
        'Machine Learning',
        'Programming (Python or R)',
        'Databases',
      ],
      4: [
        'Data Visualization',
        'Big Data Analytics',
        'Corporate Finance',
        'Operations Research',
        'International Economics',
        'Marketing Analytics',
        'Internship',
        'Thesis / State Exam',
      ],
    },
  },
  'bba in marketing': {
    displayName: 'BBA in Marketing',
    years: {
      1: [
        'Contemporary History of Kazakhstan',
        'Cambridge English B1',
        'Kazakh/Russian B1',
        'Social-Political Knowledge I',
        'Philosophy',
        'Cambridge English B2',
        'Kazakh/Russian B2',
        'Social-Political Knowledge II',
        'Information & Communication Technologies',
      ],
      2: [
        'Business Communications',
        'Organizational Behavior',
        'Business Ethics',
        'Academic Writing',
        'Introduction to Research Methods',
        'Data Analysis I',
        'Calculus I',
        'Statistics I',
        'Statistics II',
        'Introduction to Economics',
        'Microeconomics',
        'Macroeconomics',
        'Principles of Accounting',
        'Principles of Finance',
        'Principles of Management',
        'Principles of Marketing',
        'A Step to Graduate',
        'Digital Marketing',
        'Brand Management',
      ],
      3: [
        'Marketing Research & Analysis',
        'Strategic Marketing',
        'Product Management',
        'Project Management',
      ],
      4: [
        'Marketing Electives (Consumer Behavior, Advertising Strategy & Promotion, Integrated Marketing Communications, Bloomberg Market Concepts, Public Relations, Entrepreneurship, Supply Chain Management, Operations Management, Strategic Management, Innovation Management)',
        'Minor option (20–25 ECTS)',
        'Internship',
        'Bachelor Thesis / State Exam',
      ],
    },
  },
};

const majorAlias: Record<string, keyof typeof courseCatalog> = {
  'bba in information technology (it)': 'bba in it',
  'information technology': 'bba in it',
  'bba in it': 'bba in it',
  'bba in accounting': 'bba in accounting',
  'accounting': 'bba in accounting',
  'bba in finance': 'bba in finance',
  'finance': 'bba in finance',
  'bba in management': 'bba in management',
  'management': 'bba in management',
  'bba in economics and data science': 'bba in economics and data science',
  'economics and data science': 'bba in economics and data science',
  'bba in marketing': 'bba in marketing',
};

const MilestonesPage = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedYear, setSelectedYear] = useState(1);
  const [addedCoursesByYear, setAddedCoursesByYear] = useState<Record<number, string[]>>({});
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [courseInput, setCourseInput] = useState('');
  const [courseError, setCourseError] = useState<string | null>(null);

  const rawYear = Number(user?.yearOfStudy ?? 1) || 1;
  const normalizedMajor = normalizeMajor(user?.major);
  const resolvedMajorKey = normalizedMajor ? majorAlias[normalizedMajor] || normalizedMajor : undefined;
  const courseData = resolvedMajorKey ? courseCatalog[resolvedMajorKey] : undefined;

  // If a user is in year 5 or above, add an extended milestone.
  const isExtended = rawYear >= 5;

  const milestones: Milestone[] =
    isExtended
      ? [
          ...baseMilestones,
          {
            year: 5,
            label: 'Y5+',
            title: 'Extended / Additional Studies',
            description: 'Continue advanced coursework, electives, or co-op terms',
            totalTasks: 4,
          },
        ]
      : baseMilestones;

  const currentYear = clampYear(rawYear, milestones.length);

  const availableYears = useMemo(() => {
    if (courseData) {
      return Object.keys(courseData.years)
        .map(Number)
        .sort((a, b) => a - b);
    }
    return [1, 2, 3, 4];
  }, [courseData]);

  useEffect(() => {
    const maxYear = availableYears.length ? Math.max(...availableYears) : milestones.length;
    const safeYear = clampYear(currentYear, maxYear);
    if (!availableYears.includes(selectedYear)) {
      setSelectedYear(safeYear);
    }
  }, [availableYears, currentYear, milestones.length, selectedYear]);

  const selectedCourses = courseData?.years[selectedYear];
  const allMajorCourses = useMemo(
    () => (courseData ? Object.values(courseData.years).flat() : []),
    [courseData]
  );
  const allCoursesUnique = useMemo(
    () => Array.from(new Set(allMajorCourses)),
    [allMajorCourses]
  );
  const addedForYear = addedCoursesByYear[selectedYear] ?? [];
  const displayCourses = useMemo(() => {
    const current = selectedCourses ?? [];
    return Array.from(new Set([...(current || []), ...addedForYear]));
  }, [selectedCourses, addedForYear]);

  const handleAddCourse = () => {
    if (!courseData) return;
    if (!courseInput) {
      setCourseError('Select a course to add');
      return;
    }
    const isValid = allCoursesUnique.includes(courseInput);
    const alreadyInYear = addedForYear.includes(courseInput);

    if (!isValid) {
      setCourseError('Choose a course from the list');
      return;
    }

    setAddedCoursesByYear(prev => {
      const next: Record<number, string[]> = {};
      // Remove from all years
      Object.keys(prev).forEach(key => {
        const yearKey = Number(key);
        next[yearKey] = prev[yearKey].filter(c => c !== courseInput);
      });

      const updatedYearList = alreadyInYear
        ? (prev[selectedYear] ?? []).filter(c => c !== courseInput)
        : [...(prev[selectedYear] ?? []), courseInput];

      if (updatedYearList.length > 0) {
        next[selectedYear] = updatedYearList;
      } else if (next[selectedYear]?.length === 0) {
        delete next[selectedYear];
      }

      return next;
    });

    setCourseInput('');
    setCourseError(null);
    setIsAddingCourse(false);
  };

  const handleRemoveCourse = (course: string) => {
    setAddedCoursesByYear(prev => {
      const updated = { ...prev };
      const filtered = (updated[selectedYear] ?? []).filter(c => c !== course);
      if (filtered.length) {
        updated[selectedYear] = filtered;
      } else {
        delete updated[selectedYear];
      }
      return updated;
    });
  };

  const progressPercent = useMemo(() => {
    // If user is 5th year or beyond, show full completion.
    if (isExtended) return 100;

    const perYear = 100 / milestones.length;
    const completedYears = Math.max(0, currentYear - 1) * perYear;
    const inProgress = perYear * 0.6; // visual hint of in-progress year
    return Math.min(100, Math.round(completedYears + inProgress));
  }, [currentYear, milestones.length, isExtended, rawYear]);

  const navItems = useMemo(
    () => [
      { name: 'Chat Assistant', path: '/chat', active: location.pathname === '/chat' },
      { name: 'Milestones', path: '/milestones', active: location.pathname === '/milestones' },
      { name: 'Profile', path: '/profile', active: location.pathname === '/profile' },
    ],
    [location.pathname]
  );

  return (
    <div className="milestones-page">
      <ChatHeader
        onMenuClick={() => setIsSidebarOpen(prev => !prev)}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="milestones-layout">
        <Sidebar navItems={navItems} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        {isSidebarOpen && (
          <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />
        )}

        <main className="milestones-main">
          <div className="milestones-content">
            <header className="milestones-hero">
              <div className="hero-text">
                <p className="eyebrow">Your Academic Journey</p>
                <h1>Track your progress through four years at MNU</h1>
                <p className="subtitle">
                  Tailored to your current year. Right now you&apos;re viewing milestones for Year{' '}
                  {currentYear}.
                </p>
              </div>
              <div className="progress-card full-width">
                <div className="progress-top">
                  <span>Overall Progress</span>
                  <span className="progress-value">{progressPercent}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
            </header>

            <div className="timeline">
              {milestones.map(milestone => {
                const status = isExtended
                  ? 'completed'
                  : milestone.year < currentYear
                    ? 'completed'
                    : milestone.year === currentYear
                      ? 'active'
                      : 'locked';

                return (
                  <div key={milestone.year} className={`timeline-item ${status}`}>
                    <div className="circle-stack">
                      <div className={`circle-outer ${status}`}>
                        <div className="circle-inner" />
                      </div>
                      <div className="year-pill">{milestone.label}</div>
                    </div>
                    <h3>{milestone.title}</h3>
                    <p className="description">{milestone.description}</p>
                  </div>
                );
              })}
            </div>
            <div className="course-card">
              <div className="course-card__header">
                <div>
                  <p className="eyebrow">Year of Study</p>
                  <h3>
                    {courseData
                      ? `${courseData.displayName} — Year ${selectedYear}`
                      : 'Add your major in Profile to see courses'}
                  </h3>
                  <p className="course-card__hint">
                    Courses update automatically based on your selected major.
                  </p>
                </div>
                <div className="course-card__actions">
                  <div className="course-card__controls">
                    <label htmlFor="year-select">Choose year</label>
                    <select
                      id="year-select"
                      value={selectedYear}
                      onChange={e => setSelectedYear(Number(e.target.value))}
                      className="year-select"
                      disabled={!courseData}
                    >
                      {availableYears.map(year => (
                        <option key={year} value={year}>
                          Year {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="add-course">
                    {isAddingCourse ? (
                      <div className="add-course__form">
                        <select
                          className="year-select"
                          value={courseInput}
                          onChange={e => {
                            setCourseInput(e.target.value);
                            setCourseError(null);
                          }}
                          disabled={!courseData || allCoursesUnique.length === 0}
                        >
                          <option value="">Select a course</option>
                          {allCoursesUnique.map(course => (
                            <option key={course} value={course}>
                              {course}
                            </option>
                          ))}
                        </select>
                        <div className="add-course__buttons">
                          <button type="button" className="btn-secondary" onClick={() => setIsAddingCourse(false)}>
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn-primary"
                            onClick={handleAddCourse}
                            disabled={!courseInput}
                          >
                            {courseInput && addedForYear.includes(courseInput) ? 'Remove' : 'Add'}
                          </button>
                        </div>
                        {courseError && <p className="course-error">{courseError}</p>}
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={() => {
                          setIsAddingCourse(true);
                          setCourseError(null);
                        }}
                          disabled={!courseData || allCoursesUnique.length === 0}
                      >
                        + Add course
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="course-list">
                {courseData ? (
                  displayCourses.length > 0 ? (
                    displayCourses.map(course => {
                      const isTracked = addedForYear.includes(course);
                      return (
                        <div key={course} className={`course-pill ${isTracked ? 'tracked' : ''}`}>
                          <span>{course}</span>
                          <button
                            type="button"
                            className="pill-remove"
                            onClick={() => handleRemoveCourse(course)}
                            aria-label={`Remove ${course}`}
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <p className="course-empty">No courses listed for this year yet.</p>
                  )
                ) : (
                  <p className="course-empty">
                    Choose a supported major in your profile to view courses.
                  </p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MilestonesPage;
