const getServerUrl = () => {
  if (import.meta.env.MODE === 'development' || import.meta.env.DEV) {
    return 'http://localhost:3001';
  }
  return (
    (import.meta.env as { VITE_SERVER_URL?: string }).VITE_SERVER_URL || 'http://localhost:3001'
  );
};

const SERVER_URL = getServerUrl();

export interface CoursesByYearResponse {
  coursesByYear: Record<number, string[]>;
}

export async function fetchCourseProgress(token: string): Promise<CoursesByYearResponse> {
  const res = await fetch(`${SERVER_URL}/api/course-progress`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Course progress fetch error (${res.status}): ${text}`);
  }

  return res.json();
}

export async function saveCourseProgress(
  token: string,
  payload: { year: number; courses: string[] }
): Promise<CoursesByYearResponse> {
  const res = await fetch(`${SERVER_URL}/api/course-progress`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Course progress save error (${res.status}): ${text}`);
  }

  return res.json();
}
