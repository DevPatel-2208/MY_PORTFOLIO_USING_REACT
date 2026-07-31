import { FaCubes, FaRobot } from 'react-icons/fa'
import { FiCode, FiMonitor } from 'react-icons/fi'

export const services = [
  {
    id: 'fullstack',
    icon: FaCubes,
    title: 'Full Stack MERN Development',
    description:
      'End-to-end web applications with React, Node.js, Express & MongoDB — from database design to deployment.',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: 'api',
    icon: FiCode,
    title: 'RESTful API Development',
    description:
      'Scalable, secure, and documented REST APIs with authentication, validation, and database integration.',
    tags: ['Express', 'JWT', 'Postman'],
  },
  {
    id: 'frontend',
    icon: FiMonitor,
    title: 'Frontend UI Development',
    description:
      'Responsive, accessible, and animated user interfaces with modern CSS, Bootstrap 5, and vanilla JS.',
    tags: ['Bootstrap', 'CSS3', 'GSAP'],
  },
  {
    id: 'ai',
    icon: FaRobot,
    title: 'AI & Chatbot Integration',
    description:
      'Intelligent conversational agents with NLP, PDF analysis, and Google Generative AI integration.',
    tags: ['Gemini AI', 'NLP', 'Python'],
  },
]
