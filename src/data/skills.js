import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiBootstrap,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiRedis,
  SiPostman,
  SiGit,
  SiGithub,
  SiDocker,
  SiC,
  SiCplusplus,
  SiPython,
  SiPhp,
  SiRender,
} from 'react-icons/si'
import { TbApi, TbLock, TbBrandVscode } from 'react-icons/tb'
import { FiCloud, FiServer, FiGlobe, FiPaperclip } from 'react-icons/fi'
import {
  FaRobot,
  FaCogs,
  FaDatabase,
  FaNetworkWired,
  FaCreditCard,
  FaEnvelope,
  FaPalette,
  FaJava,
} from 'react-icons/fa'

export const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: FaPalette,
    chip: 'Frontend',
    blurb: 'Modern, responsive UI development with component-based architecture.',
    skills: [
      { name: 'React.js', icon: SiReact, note: 'Hooks, Redux, Context API' },
      { name: 'HTML5', icon: SiHtml5, note: 'Semantic Layouts, SEO' },
      { name: 'CSS3', icon: SiCss, note: 'Animations, Flexbox, Grid' },
      { name: 'JavaScript', icon: SiJavascript, note: 'ES6+, Async, DOM' },
      { name: 'Bootstrap', icon: SiBootstrap, note: 'Responsive Design' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    icon: FiServer,
    chip: 'Backend',
    blurb: 'Scalable server-side applications with RESTful architecture.',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, note: 'Server, APIs, Streams' },
      { name: 'Express.js', icon: SiExpress, note: 'REST APIs, Middleware' },
      { name: 'JWT', icon: TbLock, note: 'Auth, Security' },
      { name: 'REST APIs', icon: TbApi, note: 'CRUD, Auth, WebSockets' },
      { name: 'Socket.IO', icon: FiGlobe, note: 'Real-time Communication' },
    ],
  },
  {
    id: 'database',
    title: 'Database & Storage',
    icon: FaDatabase,
    chip: 'Database',
    blurb: 'Data modeling, optimization, and cloud storage solutions.',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, note: 'Aggregation, Indexing' },
      { name: 'MySQL', icon: SiMysql, note: 'Relational DBs' },
      { name: 'Cloudinary', icon: FiCloud, note: 'Media Storage, CDN' },
      { name: 'Redis', icon: SiRedis, note: 'Caching, Sessions' },
    ],
  },
  {
    id: 'ai-cloud',
    title: 'AI & Cloud Services',
    icon: FaRobot,
    chip: 'AI & Cloud',
    blurb: 'AI integration and cloud deployment expertise.',
    skills: [
      { name: 'Groq API', icon: FaRobot, note: 'AI Integration' },
      { name: 'RAG', icon: FaNetworkWired, note: 'Retrieval Augmented Gen' },
      { name: 'Cashfree', icon: FaCreditCard, note: 'Payment Gateway' },
      { name: 'Brevo API', icon: FaEnvelope, note: 'Email Service' },
    ],
  },
]

export const toolsAndPlatforms = [
  { name: 'Git & GitHub', icon: SiGithub, note: 'Version Control' },
  { name: 'VS Code', icon: TbBrandVscode, note: 'Primary IDE' },
  { name: 'Postman', icon: SiPostman, note: 'API Testing' },
  { name: 'Docker', icon: SiDocker, note: 'Containerization' },
  { name: 'Vercel', icon: FiGlobe, note: 'Frontend Deploy' },
  { name: 'Render', icon: SiRender, note: 'Backend Deploy' },
  { name: 'InfinityFree', icon: FiPaperclip, note: 'PHP Hosting' },
  { name: 'CI/CD', icon: FaCogs, note: 'Automation' },
]

export const additionalLanguages = [
  { name: 'C', icon: SiC, note: 'Problem Solving' },
  { name: 'C++', icon: SiCplusplus, note: 'OOP, DSA' },
  { name: 'Python', icon: SiPython, note: 'Scripting' },
  { name: 'Java', icon: FaJava, note: 'Application Logic' },
  { name: 'PHP', icon: SiPhp, note: 'Backend' },
]

export const techLogoList = [
  { name: 'React', icon: SiReact },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'Express', icon: SiExpress },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Tailwind', icon: SiTailwindcss },
  { name: 'Git', icon: SiGit },
  { name: 'GitHub', icon: SiGithub },
  { name: 'MySQL', icon: SiMysql },
  { name: 'PHP', icon: SiPhp },
  { name: 'Postman', icon: SiPostman },
  { name: 'Figma', icon: FaPalette },
  { name: 'Python', icon: SiPython },
  { name: 'Java', icon: FaJava },
  { name: 'Redis', icon: SiRedis },
  { name: 'Docker', icon: SiDocker },
]
