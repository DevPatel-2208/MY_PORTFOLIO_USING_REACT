export const projects = [
  {
    id: 'shophubx',
    title: 'ShopHubX — MERN E-Commerce Platform',
    category: 'fullstack',
    featured: true,
    status: 'Live Project',
    images: ['/ec1.avif', '/ee1.avif'],
    tags: ['E-Commerce', 'MERN Stack', 'Production Ready'],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux Toolkit', 'Tailwind CSS', 'Socket.IO', 'Redis', 'JWT', 'Cashfree'],
    summary:
      'A scalable, production-ready MERN stack e-commerce platform with dedicated customer and admin dashboards, secure payments via Cashfree, real-time order notifications, and Redis-backed performance.',
    description:
      'ShopHubX is a full-featured MERN stack e-commerce platform built for production. It ships with dedicated customer and admin dashboards for managing products, users, inventory, and orders, a fully responsive UI, and secure RESTful APIs. The platform is hardened with JWT authentication, Google OAuth, OTP verification, and role-based access control, and processes real payments through Cashfree with webhook validation. Core commerce features include product search, cart, wishlist, PDF invoice generation, and live order notifications powered by Socket.IO.',
    features: [
      'Dedicated customer and admin dashboards for product, user, inventory & order management',
      'JWT authentication, Google OAuth, OTP verification & role-based access control (RBAC)',
      'Cashfree payment gateway integration with webhook validation for real-time processing',
      'Product search, cart, wishlist, invoice generation & real-time order notifications via Socket.IO',
      'Redis caching and MongoDB indexing to reduce database query latency',
      'Cloudinary-optimized media delivery for fast, responsive product images',
      'Fully responsive UI with secure RESTful APIs across all user roles',
    ],
    challenges: [
      'Securing user and admin workflows across multiple roles and devices.',
      'Handling real-time order notifications reliably at scale.',
      'Reducing database query latency as catalog and order data grow.',
    ],
    solutions: [
      'Implemented JWT with Google OAuth, OTP verification, and RBAC middleware for granular access control.',
      'Leveraged Socket.IO for live, push-based order notifications across the store.',
      'Added Redis caching layers and MongoDB indexes to cut query latency, plus Cloudinary for optimized media delivery.',
    ],
    github: 'https://github.com/DevPatel-2208/SHOPHUB_ECOMMERCE',
    live: 'https://shophubx.netlify.app/',
  },
  {
    id: 'gloomy',
    title: 'Gloomy — E-Commerce Platform',
    category: 'fullstack',
    featured: true,
    status: 'Live Project',
    images: ['/e.jpg', '/gr.jpg', '/ec.jpg'],
    tags: ['E-Commerce', 'Payment Ready'],
    tech: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'jQuery', 'Brevo API', 'Cashfree'],
    summary:
      'A fully dynamic and mobile-responsive e-commerce platform with email OTP verification, online payments via Cashfree, order tracking, PDF invoice generation, and real-time user interactions.',
    description:
      'Gloomy is a production-style e-commerce platform designed around real-world storefront workflows. It ships with a full customer journey — secure sign-up with email OTP, browsing, cart and wishlist, checkout with online or COD payments, order tracking, and downloadable PDF invoices — plus a complete admin panel to manage the store.',
    features: [
      'User registration with OTP email verification via Brevo API',
      'Admin panel for products, categories, users & orders',
      'PDF invoice generation per order',
      'Real-time order tracking & status updates',
      'Cashfree test-mode online payments',
      'Wishlist & add-to-cart using Ajax',
      'Confetti animation on successful order placement',
    ],
    challenges: [
      'Implementing secure email OTP verification without a paid auth provider.',
      'Keeping the cart and wishlist in sync across pages with AJAX.',
      'Generating valid PDF invoices for every placed order.',
    ],
    solutions: [
      'Built an OTP lifecycle with expiry handling and rate limits on the Brevo transactional API.',
      'Centralized AJAX cart/wishlist modules with optimistic UI updates.',
      'Used a server-side PDF generator template shared by the admin and user flows.',
    ],
    github: 'https://github.com/DevPatel-2208/Gloomy',
    live: null,
  },
  {
    id: 'sport-club',
    title: 'Sport Club Management System',
    category: 'fullstack',
    featured: false,
    status: 'Featured Project',
    images: ['/sd.jpg'],
    tags: ['Final Year Build', 'ASP.NET'],
    tech: ['ASP.NET C#', 'HTML', 'CSS', 'JavaScript', 'Bootstrap', 'jQuery', 'SQL Server'],
    summary:
      'A dynamic Sport Club Management System enabling users to register, book activities, and manage club services with OTP validation.',
    description:
      'This system streamlines club operations — members register, book activities, and pay through an integrated dummy payment gateway, while admins manage activities and users from a single dashboard.',
    features: [
      'User authentication with OTP validation',
      'Admin panel for managing activities and users',
      'Integrated dummy payment system',
      'Auto-generated order IDs and dynamic pricing',
      'Client-side validations and mobile responsiveness',
    ],
    challenges: [
      'Designing a role-based flow for members, staff, and admins.',
      'Generating unique order IDs under concurrent bookings.',
    ],
    solutions: [
      'Centralized auth middleware distinguishing member vs admin routes.',
      'Database-backed sequence with business prefix for collision-safe order IDs.',
    ],
    github: 'https://github.com/DevPatel-2208/SPORT_CLUB_MANAGEMENT_SYSTEM.git',
    live: null,
  },
  {
    id: 'gym',
    title: 'Gym Management System',
    category: 'fullstack',
    featured: false,
    status: 'Full Stack Build',
    images: ['/gym.jpg'],
    tags: ['Admin Workflow', 'Responsive'],
    tech: ['ASP.NET C#', 'HTML', 'CSS', 'JavaScript', 'Bootstrap', 'jQuery', 'SQL Server'],
    summary:
      'A fully dynamic and responsive Gym Management System with member enrollment, authentication, subscription plans, and trainer assignment.',
    description:
      'A complete gym management solution covering member enrollment, secure login, subscription plan management, and trainer assignment, all surfaced through a comprehensive admin dashboard.',
    features: [
      'Member enrollment and management',
      'Secure login and authentication',
      'Subscription plan management',
      'Trainer assignment system',
      'Comprehensive admin dashboard',
    ],
    challenges: [
      'Modeling many-to-many relationships between members, plans, and trainers.',
      'Keeping the dashboard readable as membership data grows.',
    ],
    solutions: [
      'Normalized SQL Server schema with foreign-key integrity and cascading deletes.',
      'Aggregated dashboard queries grouped by plan and trainer.',
    ],
    github: 'https://github.com/DevPatel-2208/GYM_MANAGEMENT_SYSTEM.git',
    live: null,
  },
  {
    id: 'smart-study-hub',
    title: 'Smart Study Hub',
    category: 'academic',
    featured: false,
    status: 'Student Platform',
    images: ['/sm.jpg'],
    tags: ['Learning Portal', 'Content Managed'],
    tech: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'jQuery', 'AJAX', 'SweetAlert'],
    summary:
      'A complete academic solution offering centralized access to notes, previous papers, tutorials, and study materials.',
    description:
      'Smart Study Hub gives students a single place to access PDFs, question banks, and study notes organized by semester and subject, with reviews, ratings, and instant AJAX-powered search.',
    features: [
      'Online access to PDFs, question banks, and study notes',
      'Admin panel to manage uploaded study material',
      'Categorized material for semesters and subjects',
      'Review and rate uploaded materials',
      'Dynamic search for quick content filtering',
      'AJAX-based form submissions without page reloads',
    ],
    challenges: [
      'Fast search across a growing library of documents.',
      'Enforcing review ownership so students rate material once.',
    ],
    solutions: [
      'Server-side LIKE-based search with client-side debouncing.',
      'Composite uniqueness on the review table scoped to user + material.',
    ],
    github: 'https://github.com/DevPatel-2208/Smart_Study_Hub-Project',
    live: null,
  },
  {
    id: 'weathernow',
    title: 'WeatherNow — Real-time Weather App',
    category: 'utility',
    featured: false,
    status: 'API Integration',
    images: ['/ww.jpg'],
    tags: ['Live Data', 'Fast UI'],
    tech: ['PHP', 'HTML', 'CSS', 'JavaScript', 'Bootstrap', 'OpenWeather API'],
    summary:
      'A real-time weather checking app that fetches live weather data and displays temperature, humidity, wind speed, and condition icons.',
    description:
      'WeatherNow consumes a live weather API to deliver current conditions for any city, mapping data to condition-specific icons in a clean, responsive interface.',
    features: [
      'Live weather updates using WeatherAPI.com',
      'Search weather by city name',
      'Temperature, humidity, wind speed & condition display',
      'Weather icons change based on condition',
      'Fully responsive for desktop & mobile',
    ],
    challenges: [
      'Handling API errors and unknown city lookups gracefully.',
      'Mapping many weather codes to the right visual icon.',
    ],
    solutions: [
      'Centralized fetch wrapper with fallback states and friendly messages.',
      'A lookup table mapping weather codes to icons and colors.',
    ],
    github: 'https://github.com/DevPatel-2208/wheather_api-Project.git',
    live: null,
  },
]

export const projectFilters = [
  { value: 'all', label: 'All Projects' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'academic', label: 'Academic' },
  { value: 'utility', label: 'API / Utility' },
]
