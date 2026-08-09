export const educationTimeline = [
  {
    id: 'mca',
    type: 'education',
    period: '2025 — Present',
    year: '2025',
    title: 'Master of Computer Applications (MCA)',
    place: 'PG Dept. of CS & Tech, Sardar Patel University',
    summary:
      'Advanced study in software engineering, system design, and modern application development.',
    highlights: [
      { icon: 'trophy', text: 'University Rank 2 in Semester 2' },
      { icon: 'gpa', text: 'Sem 2 GPA: 9.62 / 10' },
      { icon: 'trophy', text: 'University Rank 3 in Semester 1' },
      { icon: 'gpa', text: 'Sem 1 GPA: 9.28 / 10' },
    ],
    metric: { label: 'Sem 2 GPA', value: '9.62', pct: 96.2 },
  },
  {
    id: 'bca',
    type: 'education',
    period: '2022 — 2025',
    year: '2022',
    title: 'Bachelor of Computer Applications (BCA)',
    place: 'Aanand Commerce College, Sardar Patel University',
    summary:
      'Built a strong foundation in programming, databases, and web technologies while ranking among the top students.',
    highlights: [
      { icon: 'trophy', text: 'University Rank 1 in Semester 5' },
      { icon: 'medal', text: 'College Rank 4 Overall' },
      { icon: 'star', text: 'University Level: 5th Position' },
    ],
    metric: { label: 'Overall CGPA', value: '9.62', pct: 96.2 },
  },
]

export const bcaSemesters = [
  { sem: 'Semester 1', gpa: '9.55', width: 95.5 },
  { sem: 'Semester 2', gpa: '9.46', width: 94.6 },
  { sem: 'Semester 3', gpa: '9.71', width: 97.1 },
  { sem: 'Semester 4', gpa: '9.43', width: 94.3 },
  { sem: 'Semester 5', gpa: '9.92', width: 99.2, rank: 'University Rank 1' },
  { sem: 'Semester 6', gpa: '9.67', width: 96.7 },
]

export const mcaSemesters = [
  { sem: 'Semester 1', gpa: '9.28', width: 92.8, rank: 'University Rank 3' },
  { sem: 'Semester 2', gpa: '9.62', width: 96.2, rank: 'University Rank 2' },
  { sem: 'Semester 3', gpa: 'Upcoming', width: 0, upcoming: true },
  { sem: 'Semester 4', gpa: 'Upcoming', width: 0, upcoming: true },
]
