// Mock analytics + inbox data for the admin dashboard. In a real MERN app
// these would come from /api/admin/* endpoints; here they are static so the
// dashboard is fully self-contained and demoable.

export const adminStats = [
  {
    id: 'projects',
    label: 'Total Projects',
    value: 8,
    delta: '+2',
    trend: 'up',
    hint: 'vs last month',
    icon: 'FiBox',
    tone: 'primary',
    spark: [3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 8],
  },
  {
    id: 'certificates',
    label: 'Certifications',
    value: 12,
    delta: '+3',
    trend: 'up',
    hint: 'vs last month',
    icon: 'FiAward',
    tone: 'accent',
    spark: [6, 7, 7, 8, 9, 9, 10, 10, 11, 11, 12, 12],
  },
  {
    id: 'views',
    label: 'Profile Views',
    value: 8642,
    delta: '+18.2%',
    trend: 'up',
    hint: 'vs last month',
    icon: 'FiEye',
    tone: 'secondary',
    spark: [2100, 2340, 2510, 2680, 3020, 3180, 3520, 3890, 4320, 5120, 6010, 8642],
  },
  {
    id: 'messages',
    label: 'Inbox Messages',
    value: 128,
    delta: '+9',
    trend: 'up',
    hint: '3 unread',
    icon: 'FiMail',
    tone: 'warning',
    spark: [88, 92, 95, 99, 101, 106, 108, 112, 115, 119, 124, 128],
  },
]

export const viewsSeries = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  values: [420, 560, 490, 720, 880, 760, 1020, 1180, 1310, 1490, 1720, 2100],
}

export const activitySeries = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  values: [32, 48, 40, 62, 55, 74, 68],
}

export const stackSeries = [
  { id: 'frontend', label: 'Frontend', value: 38, tone: 'primary' },
  { id: 'backend', label: 'Backend', value: 32, tone: 'secondary' },
  { id: 'database', label: 'Database', value: 18, tone: 'accent' },
  { id: 'devops', label: 'DevOps & Tools', value: 12, tone: 'warning' },
]

export const recentActivity = [
  {
    id: 'a1',
    kind: 'deploy',
    text: 'ClinicOCR deployed to production',
    meta: '2 hours ago',
    tone: 'accent',
  },
  {
    id: 'a2',
    kind: 'message',
    text: 'New message from Aarav Mehta (TCS Talent)',
    meta: '4 hours ago',
    tone: 'primary',
  },
  {
    id: 'a3',
    kind: 'certificate',
    text: 'Certificate added — Omnikon Frontend Quiz Winner',
    meta: 'Yesterday',
    tone: 'warning',
  },
  {
    id: 'a4',
    kind: 'project',
    text: 'ShopHubX repository received a new star',
    meta: '2 days ago',
    tone: 'secondary',
  },
  {
    id: 'a5',
    kind: 'message',
    text: 'Freelance inquiry from Rahul Gupta',
    meta: '3 days ago',
    tone: 'primary',
  },
]

export const messages = [
  {
    id: 'm1',
    name: 'Aarav Mehta',
    email: 'aarav.mehta@tcs.com',
    role: 'Talent Acquisition · TCS',
    subject: 'Interview Opportunity — Full Stack Developer (MERN)',
    tag: 'Recruiter',
    preview:
      'Hi Dev, we came across your portfolio and were really impressed by your ClinicOCR project. We have an immediate opening for a Full Stack Developer…',
    body: [
      'Hi Dev,',
      'We came across your portfolio and were really impressed by your ClinicOCR project — the OCR + Gemini AI pipeline for prescription digitization is exactly the kind of engineering we value.',
      'We have an immediate opening for a Full Stack Developer (MERN) at our Ahmedabad campus. The role involves building internal healthcare tools, working with React, Node.js and MongoDB. CTC range is ₹6–9 LPA.',
      'Would you be available for a 30-minute screening call this week? Let me know your preferred slots.',
      'Best regards,\nAarav Mehta\nTalent Acquisition, Tata Consultancy Services',
    ],
    date: '2h ago',
    unread: true,
    starred: true,
  },
  {
    id: 'm2',
    name: 'Rahul Gupta',
    email: 'rahul@growthkarts.in',
    role: 'Founder · GrowthKarts',
    subject: 'Freelance inquiry — E-commerce platform build',
    tag: 'Client',
    preview:
      'I am building a D2C e-commerce brand and need a MERN developer to build the storefront and admin panel. Saw your ShopHubX project and it is very close to what I need…',
    body: [
      'Hi Dev,',
      'I am building a D2C e-commerce brand and need a MERN developer to build the storefront and admin panel. I saw your ShopHubX project and it is very close to what I need.',
      'Scope: product catalog, cart, checkout with a payment gateway, order tracking and an admin dashboard. Timeline is roughly 8–10 weeks.',
      'Can we hop on a call to discuss scope and budget?',
      'Thanks,\nRahul Gupta',
    ],
    date: '4h ago',
    unread: true,
    starred: false,
  },
  {
    id: 'm3',
    name: 'Sneha Reddy',
    email: 'sneha@omnikon.org',
    role: 'Community Manager · Omnikon',
    subject: 'Congratulations on winning the Frontend Quiz 🏆',
    tag: 'Community',
    preview:
      'Congratulations on securing a top position in the Omnikon Frontend Quiz! Your certificate and a small winners-only care package are on the way…',
    body: [
      'Hi Dev,',
      'Congratulations on securing a top position in the Omnikon Frontend Quiz! Your speed and accuracy on the CSS Grid and React JSX rounds stood out.',
      'Your certificate and a small winners-only care package are on the way. We would also love to feature your profile in our winners showcase — let us know if you are comfortable with that.',
      'Cheers,\nSneha Reddy\nOmnikon Open Source Organization',
    ],
    date: 'Yesterday',
    unread: true,
    starred: true,
  },
  {
    id: 'm4',
    name: 'Neha Patel',
    email: 'neha.patel@recodeai.dev',
    role: 'Engineering Manager · Recode AI',
    subject: 'Collaboration on AI document processing',
    tag: 'Collaboration',
    preview:
      'Your work with Tesseract OCR + Gemini structuring is very relevant to a problem we are solving. We are open to a part-time collaboration or internship…',
    body: [
      'Hi Dev,',
      'Your work with Tesseract OCR + Gemini structuring is very relevant to a problem we are solving at Recode AI — extracting structured data from noisy clinical documents.',
      'We are open to a part-time collaboration or a 3-month internship. Fully remote, flexible hours, and you would work directly with our ML team.',
      'Let me know if this interests you and I will share the detailed problem statement.',
      'Best,\nNeha Patel',
    ],
    date: 'Yesterday',
    unread: false,
    starred: false,
  },
  {
    id: 'm5',
    name: 'Vikram Singh',
    email: 'vikram.s@wipro.com',
    role: 'Tech Lead · Wipro',
    subject: 'Referral for MERN developer position',
    tag: 'Recruiter',
    preview:
      'I head a delivery team at Wipro and a portfolio referral from your college placement cell landed on my desk. Your system design answers were strong…',
    body: [
      'Hi Dev,',
      'I head a delivery team at Wipro and a portfolio referral from your college placement cell landed on my desk. Your system design answers in the ShopHubX write-up were strong.',
      'We have a MERN developer position opening up next quarter. I can refer you internally if you are interested — it fast-tracks the first two rounds.',
      'Regards,\nVikram Singh',
    ],
    date: '2 days ago',
    unread: false,
    starred: false,
  },
  {
    id: 'm6',
    name: 'Karan Joshi',
    email: 'karan@clinicocr.health',
    role: 'Cofounder · ClinicOCR',
    subject: 'Demo scheduling for prescription OCR module',
    tag: 'Client',
    preview:
      'The clinic pilot is starting next Monday. Can we schedule a demo of the OCR confidence-scoring workflow before that with the doctors…',
    body: [
      'Hi Dev,',
      'The clinic pilot is starting next Monday. Can we schedule a demo of the OCR confidence-scoring workflow before that, with the two lead doctors present?',
      'They specifically want to see the doctor-verification step and how the AI-extracted dosage fields are surfaced for review.',
      'Let me know a slot that works — I am flexible between 4 PM and 8 PM IST.',
      'Thanks,\nKaran Joshi',
    ],
    date: '3 days ago',
    unread: false,
    starred: true,
  },
  {
    id: 'm7',
    name: 'Ananya Iyer',
    email: 'ananya.iyer@zoho.com',
    role: 'HR · Zoho Corporation',
    subject: 'Your profile matches our SDE opening',
    tag: 'Recruiter',
    preview:
      'Your profile came up in our talent search for the Software Engineer role at Zoho. We were particularly impressed by your CGPA of 9.62 and full-stack projects…',
    body: [
      'Hi Dev,',
      'Your profile came up in our talent search for the Software Engineer role at Zoho. We were particularly impressed by your CGPA of 9.62 and the breadth of your full-stack projects.',
      'The role is based out of Chennai with a hybrid model. If you are open to relocating, I would love to take your candidature forward.',
      'Warm regards,\nAnanya Iyer\nZoho Corporation',
    ],
    date: '4 days ago',
    unread: false,
    starred: false,
  },
  {
    id: 'm8',
    name: 'Ishita Desai',
    email: 'ishita.desai@dev.to',
    role: 'Developer · Open Source',
    subject: 'Open source contribution question — ClinicOCR',
    tag: 'Collaboration',
    preview:
      'I loved your ClinicOCR repo and wanted to contribute the Python preprocessing pipeline as a reusable module. Is that something you would accept a PR for…',
    body: [
      'Hi Dev,',
      'I loved your ClinicOCR repo and wanted to contribute the Python preprocessing pipeline as a reusable module so others can plug in their own OCR engines.',
      'Is that something you would accept a PR for? Happy to open an issue first and discuss the module boundaries before writing any code.',
      'Thanks!\nIshita',
    ],
    date: '5 days ago',
    unread: false,
    starred: false,
  },
]

// Preferences shown on the Settings view (local state only).
export const defaultPreferences = {
  emailNotifications: true,
  pushNotifications: false,
  weeklyReport: true,
  profileVisibility: true,
  showAchievements: true,
  newsletter: false,
}
