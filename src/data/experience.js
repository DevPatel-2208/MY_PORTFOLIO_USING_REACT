import {
  FaRobot,
  FaCode,
  FaBrain,
  FaDatabase,
  FaFileAlt,
  FaTachometerAlt,
  FaFlask,
} from 'react-icons/fa'

export const experience = {
  role: 'Research & Development Internship',
  place: 'Sardar Patel University',
  period: 'May 2025 – July 2026',
  type: 'Internship',
  icon: FaFlask,
  highlights: [
    {
      icon: FaRobot,
      title: 'AI-Powered Chatbot',
      text: 'Built an intelligent MCA Admission Assistant Chatbot using the MERN Stack with conversational AI powered by Groq API and RAG architecture.',
    },
    {
      icon: FaCode,
      title: 'REST API Development',
      text: 'Designed and implemented secure RESTful APIs with JWT authentication, role-based access control, and comprehensive request validation.',
    },
    {
      icon: FaBrain,
      title: 'Generative AI Integration',
      text: 'Integrated Google Generative AI and Groq LLM for context-aware responses with PDF analysis capabilities for admission document processing.',
    },
    {
      icon: FaDatabase,
      title: 'Database Design',
      text: 'Architected MongoDB schemas for complex admission workflows including student inquiries, counselor assignments, and query analytics.',
    },
    {
      icon: FaFileAlt,
      title: 'Technical Research',
      text: 'Authored a research paper documenting the architecture, implementation, and impact of AI-driven admission assistance systems in higher education.',
    },
    {
      icon: FaTachometerAlt,
      title: 'Admin Dashboard',
      text: 'Developed a comprehensive admin panel with real-time analytics, user management, conversation logging, and system performance monitoring.',
    },
  ],
  tags: ['MERN Stack', 'Groq AI', 'RAG Architecture', 'JWT Auth', 'MongoDB', 'Research'],
}
