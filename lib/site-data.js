export const siteMeta = {
  name: "Ankit Bhardwaj",
  shortName: "ANKIT.",
  role: "Software Engineer",
  subtitle: "FULL STACK SYSTEMS · SOFTWARE ENGINEER · NSUT '25",
  heroTitle: "FULL STACK\nSYSTEMS",
  heroText:
    "ENGINEERING GRADUATE FROM NETAJI SUBHAS UNIVERSITY OF TECHNOLOGY. I BUILD MODERN WEB APPLICATIONS, EXPLORE MACHINE LEARNING, AND LOVE CRAFTING INNOVATIVE PROJECTS THAT SOLVE REAL-WORLD PROBLEMS.",
  intro:
    "A portfolio showcasing my full-stack development journey, competitive programming achievements, and explorations into AI-driven systems.",
  email: "ankitbhardwaj80100@gmail.com",
  companyEmail: "mainframe.ankit@gmail.com",
  phone: "+91 9555516408",
  location: "NEW DELHI, INDIA",
  availability:
    "CURRENT_STATUS: OPEN_FOR_COLLABORATION. LATENCY: < 24H. SEEKING: SOFTWARE_ENGINEERING_ROLES.",
};

export const primaryNav = [
  ["01.", "HOME", "/"],
  ["02.", "PROJECTS", "/projects"],
  ["03.", "EXPERIENCE", "/experience"],
  ["04.", "PUBLICATIONS", "/publications"],
  ["05.", "CREDENTIALS", "/credentials"],
  ["06.", "ABOUT", "/about"],
  ["07.", "CONTACT", "/contact"],
];

export const profileLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Ankit6149",
    note: "Code repositories, experiments, and open source work",
    color: "var(--orange)",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ankit-bhardwaj-6b9b62221/",
    note: "Professional profile, experience, and network",
    color: "var(--blue)",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/ankit_bh_/",
    note: "Problem solving practice and algorithm work",
    color: "var(--gold)",
  },
  {
    label: "ORCID",
    href: "https://orcid.org/0009-0005-3408-0058",
    note: "Research identity, publications, and scholarly links",
    color: "var(--mint)",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ankit.bh_/",
    note: "Personal and creative profile linked from GitHub",
    color: "var(--coral)",
  },
];

export const capabilityCards = [
  {
    label: "FRONTEND SYSTEMS",
    title: "Modern Web Interfaces",
    body: "Building responsive, accessible user interfaces with React/Next.js, focusing on performance, user experience, and scalable component architecture.",
    points: ["REACT / NEXT.JS", "RESPONSIVE DESIGN", "PERFORMANCE OPTIMIZATION"],
    color: "var(--coral)",
  },
  {
    label: "BACKEND ENGINEERING",
    title: "API & Data Systems",
    body: "Developing robust backend services, database design, and API architectures that support scalable web applications and data-driven solutions.",
    points: ["NODE.JS / PYTHON", "DATABASE DESIGN", "RESTFUL APIS"],
    color: "var(--mint)",
  },
  {
    label: "AI/ML INTEGRATION",
    title: "Intelligent Systems",
    body: "Exploring machine learning applications, computer vision, and AI-driven features to enhance user experiences and solve complex problems.",
    points: [
      "PYTHON / TENSORFLOW / PYTORCH",
      "DATA PREPROCESSING",
      "MODEL INTEGRATION",
    ],
    color: "var(--gold)",
  },
  {
    label: "FULL-STACK SOLUTIONS",
    title: "End-to-End Development",
    body: "Delivering complete software solutions from concept to deployment, combining frontend, backend, and AI/ML technologies for comprehensive results.",
    points: [
      "FULL-STACK ARCHITECTURE",
      "CI/CD PIPELINES",
      "CLOUD DEPLOYMENT",
    ],
    color: "var(--blue)",
  },
];

export const featuredProjects = [
  {
    name: "The Wild Oasis",
    type: "Full-Stack Booking Platform",
    stack: "Next.js / Supabase / Tailwind CSS",
    summary:
      "A complete cabin booking platform for a boutique hotel. Engineered with Next.js App Router and Supabase, supporting secure reservations for 8 luxury cabins with Google OAuth 2.0 and middleware-protected sessions.",
    highlights: ["Google OAuth 2.0", "Server-Side Rendering", "Responsive Design"],
    live: "https://the-wild-oasis-website-tau-eight.vercel.app",
    color: "var(--coral)",
  },
  {
    name: "CardXpert AI",
    type: "AI Recommendation Bot",
    stack: "Next.js / Gemini 1.5 / Generative AI",
    summary:
      "An AI-powered web app integrating Google Gemini 1.5 Flash API for personalized credit card recommendations. Features a multifactor engine that improved relevance by 25% over traditional methods.",
    highlights: ["Gemini 1.5 Flash", "Multifactor Engine", "100% API Fallback"],
    live: "https://credit-card-recommendation-system-two.vercel.app",
    color: "var(--gold)",
  },
  {
    name: "Auto-Reach",
    type: "Workflow Automation",
    stack: "n8n / JavaScript / Azure",
    summary:
      "Automated personalized outreach to 20 contacts daily by integrating Gmail, Google Sheets, and Drive APIs. Leveraged custom JavaScript blocks on an Azure-deployed n8n instance to automate 90% of the process.",
    highlights: ["n8n Automation", "Custom JS Blocks", "Azure Deployment"],
    live: null,
    previewImage: "/projects/auto-reach.png",
    color: "var(--blue)",
  },
];

export const projectArchive = [
  {
    id: "01",
    name: "Auto-Reach Outreach Automation",
    stack: "n8n, JavaScript, Azure, APIs",
    status: "Completed",
    description: "Automated personalized outreach to 20 contacts daily by integrating Gmail, Google Sheets, and Drive APIs. Deployed on Azure using n8n.",
    github: null,
    live: null,
    previewImage: "/projects/auto-reach.png",
  },
  {
    id: "02",
    name: "CardXpert AI recommendation",
    stack: "Next.js, Gemini 1.5, Python",
    status: "Completed",
    description: "AI-powered web app integrating Gemini 1.5 Flash for personalized credit card recommendations with < 500ms response time.",
    github: "https://github.com/Ankit6149/credit-card-recommendation-system",
    live: "https://credit-card-recommendation-system-two.vercel.app",
  },
  {
    id: "03",
    name: "The Wild Oasis (Operational)",
    stack: "React, Supabase, Styled Components",
    status: "Completed",
    description: "Full-stack hotel management app with secure CRUD operations for 8 cabins and 50+ bookings. Features interactive Recharts dashboard.",
    github: "https://github.com/Ankit6149/the-wild-oasis",
    live: "https://the-wild-oasis-xi-six.vercel.app",
  },
  {
    id: "04",
    name: "The Wild Oasis (Customer)",
    stack: "Next.js, Supabase, Tailwind CSS",
    status: "Completed",
    description: "Cabin booking platform with Next.js App Router, supporting secure reservations, cancellations, and user profiles.",
    github: "https://github.com/Ankit6149/the-wild-oasis-website",
    live: "https://the-wild-oasis-website-tau-eight.vercel.app",
  },
  {
    id: "05",
    name: "QuickGick User Management",
    stack: "React, Redux, Firebase, Google Maps",
    status: "Completed",
    description: "Developed a user management app supporting 50+ users with real-time location tracking and Firebase role-based access control.",
    github: null,
    live: null,
  },
  {
    id: "06",
    name: "Emotion-H Net Research",
    stack: "Python, Transformers, Deep Learning",
    status: "Completed",
    description: "Hybrid Transformer architecture for emotion recognition via multi-feature signal fusion. Accepted at ICDSA 2025.",
    github: null,
    live: "https://link.springer.com/chapter/10.1007/978-3-032-15407-1_18",
  },
  {
    id: "07",
    name: "Finance Backend zorvyn",
    stack: "Node.js, Express, PostgreSQL",
    status: "Completed",
    description: "Finance backend API with JWT auth, role-based access control, Zod validation, and dashboard analytics endpoints.",
    github: "https://github.com/Ankit6149/finance-backend-zorvyn",
    live: null,
  },
  {
    id: "08",
    name: "n8n (Custom Fork)",
    stack: "TypeScript, Workflow Automation",
    status: "Active",
    description: "Fair-code workflow automation platform with native AI capabilities. Combine visual building with custom code.",
    github: "https://github.com/Ankit6149/n8n",
    live: null,
  },
  {
    id: "09",
    name: "wyrd-automation-n8n",
    stack: "n8n, CRM Automation",
    status: "Completed",
    description: "n8n automation featuring a lead follow-up workflow and a weekly CRM reporting workflow.",
    github: "https://github.com/Ankit6149/wyrd-automation-n8n",
    live: null,
  },
  {
    id: "10",
    name: "VectorShift Technical Assessment",
    stack: "React, FastAPI, DAG Validation",
    status: "Completed",
    description: "React + FastAPI pipeline builder that lets users create node-based workflows and validate DAGs.",
    github: "https://github.com/Ankit6149/VectorShift-technical-assessment",
    live: null,
  },
  {
    id: "11",
    name: "artworks-database",
    stack: "React, TypeScript, Art API",
    status: "Completed",
    description: "Data table for browsing the Art Institute of Chicago collection with server-side pagination.",
    github: "https://github.com/Ankit6149/artworks-database",
    live: "https://artworks-database.netlify.app/",
  },
  {
    id: "12",
    name: "Research-paper-tracker",
    stack: "React, Express, Neon PostgreSQL",
    status: "Completed",
    description: "Full-stack web app to manage and analyze your paper-reading workflow.",
    github: "https://github.com/Ankit6149/Research-paper-tracker",
    live: "https://research-paper-tracker-frontend-psi.vercel.app/",
  },
  {
    id: "13",
    name: "cultre-boat-assessment",
    stack: "React, Form Validation",
    status: "Completed",
    description: "Multi-step form built with React, focusing on a seamless user experience.",
    github: "https://github.com/Ankit6149/cultre-boat-assessment",
    live: "https://cultre-boat-assessment.vercel.app/",
  },
  {
    id: "14",
    name: "fast-react-pizza-co",
    stack: "React, Redux, Vite",
    status: "Completed",
    description: "Modern pizza ordering web app featuring dynamic menus and real-time order tracking.",
    github: "https://github.com/Ankit6149/fast-react-pizza-co",
    live: "https://fast-react-pizza-ankit-bhardwaj.netlify.app/",
  },
  {
    id: "15",
    name: "usePopcorn",
    stack: "React, OMDB API",
    status: "Completed",
    description: "React-based movie rating app that lets users search for movies and rate them.",
    github: "https://github.com/Ankit6149/usePopcorn-movie_rating_webapp",
    live: "https://usepopcorn-movierating-ankitbhardwaj.netlify.app/",
  },
  {
    id: "16",
    name: "linear-regression-ml",
    stack: "Python, scikit-learn",
    status: "Completed",
    description: "Applies linear regression to a Chicago taxi trip dataset to predict fares.",
    github: "https://github.com/Ankit6149/linear-regression-ml",
    live: null,
  },
  {
    id: "17",
    name: "bankist-webapp",
    stack: "JavaScript, Animations",
    status: "Completed",
    description: "Modern banking website showcasing smooth animations and complex JS interactions.",
    github: "https://github.com/Ankit6149/bankist-webapp",
    live: "https://bankist-ankitbhardwaj.netlify.app/",
  },
  {
    id: "18",
    name: "WorldWise",
    stack: "React, Leaflet, Context API",
    status: "Completed",
    description: "Travel tracking app that allows users to log their journeys on an interactive map.",
    github: "https://github.com/Ankit6149/WorldWise-React-webapp",
    live: "https://mapty-ankitbhardwaj.netlify.app/",
  },
  {
    id: "19",
    name: "ReactQuiz",
    stack: "React, useReducer",
    status: "Completed",
    description: "Interactive quiz application with a global timer and dynamic question handling.",
    github: "https://github.com/Ankit6149/ReactQuiz",
    live: "https://react-quiz-ankit-bhardwaj.netlify.app/",
  },
  {
    id: "20",
    name: "forkify_recipeApp",
    stack: "JavaScript, MVC Pattern",
    status: "Completed",
    description: "Recipe search and bookmarking application built with vanilla JavaScript.",
    github: "https://github.com/Ankit6149/forkify_recipeApp",
    live: "https://forkify-ankitbhardwaj.netlify.app/",
  },
  {
    id: "21",
    name: "Omnifood",
    stack: "HTML, CSS, JS",
    status: "Completed",
    description: "Fully responsive food delivery website featuring a modern UI.",
    github: "https://github.com/Ankit6149/omnifood2",
    live: "https://omnifood-ankit-bhardwaj.netlify.app/",
  },
  {
    id: "22",
    name: "pig-game",
    stack: "JavaScript",
    status: "Completed",
    description: "A fun, two-player dice game where players race to reach 100 points.",
    github: "https://github.com/Ankit6149/pig-game",
    live: "https://pig-game-ankitbhardwaj.netlify.app/",
  },
  {
    id: "23",
    name: "weather-web-app",
    stack: "React (Class Components)",
    status: "Completed",
    description: "Weather application fetching real-time data from the OpenWeather API.",
    github: "https://github.com/Ankit6149/weather-web-app",
    live: "https://classy-weather-ankit-bhardwaj.netlify.app/",
  },
  {
    id: "24",
    name: "ContextAPI-the-atomic-blog",
    stack: "React, Context API",
    status: "Completed",
    description: "React blogging app created to practice Context API for state management.",
    github: "https://github.com/Ankit6149/ContextAPI-the-atomic-blog",
    live: "https://the-atomic-blog-context-api-practice.netlify.app/",
  },
  {
    id: "25",
    name: "Travelling-items-list-logger",
    stack: "React",
    status: "Completed",
    description: "A React app to create and manage a checklist of items for travel.",
    github: "https://github.com/Ankit6149/Travelling-items-list-logger",
    live: "https://travel-list-logger-ankitbhardwaj.netlify.app/",
  },
  {
    id: "26",
    name: "eat-n-split",
    stack: "React",
    status: "Completed",
    description: "A simple React app for splitting bills among friends.",
    github: "https://github.com/Ankit6149/eat-n-split-_BASIC_REACT",
    live: "https://eat-n-split-ankitbhardwaj.netlify.app/",
  },
  {
    id: "27",
    name: "Machine Learning Specialization",
    stack: "Python, ML Theory",
    status: "Completed",
    description: "Solutions and notes for the ML Specialization by Stanford/Deeplearning.ai.",
    github: "https://github.com/Ankit6149/Machine-Learning-Specialization-Coursera",
    live: null,
  },
  {
    id: "28",
    name: "natours-project",
    stack: "HTML, CSS (Sass)",
    status: "Completed",
    description: "Advanced CSS and Sass project featuring complex layouts for a tour booking site.",
    github: "https://github.com/Ankit6149/natours-project",
    live: null,
  },
];

export const publications = [
  {
    title: "Emotion-H Net: A Hybrid Transformer Architecture for Emotion Recognition",
    venue: "6th International Conference on Data Sciences and Applications (ICDSA 2025)",
    year: "2025",
    summary:
      "A lightweight Transformer-based model (~5 MB) achieving 86.8% accuracy on the DEAP dataset. Featured in ICDSA 2025 at MNIT Jaipur.",
    linkLabel: "View Publication",
    href: "https://link.springer.com/chapter/10.1007/978-3-032-15407-1_18",
  }
];

export const researchThemes = [
  "Transformer Architectures",
  "Deep Learning in Healthcare",
  "Generative AI & LLMs",
  "Workflow Automation",
];

export const certificateCategories = [
  { key: "ai-ml", label: "AI & Machine Learning", icon: "🤖" },
  { key: "web-dev", label: "Web Development", icon: "💻" },
  { key: "programming", label: "Programming", icon: "⚙️" },
  { key: "professional", label: "Professional", icon: "🏢" },
];

export const certificates = [
  {
    title: "Advanced Learning Algorithms",
    issuer: "Coursera",
    issued: "Oct 2025",
    credentialId: "LASCI07TTY3Q",
    skills: ["Deep Learning", "TensorFlow", "Neural Networks", "Decision Trees", "Recommender Systems", "Multi-class Classification", "Gradient Descent"],
    verifyUrl: "https://www.coursera.org/account/accomplishments/verify/LASCI07TTY3Q",
    category: "ai-ml",
    color: "var(--coral)",
  },
  {
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "Coursera",
    issued: "Sep 2025",
    credentialId: "O1XDQ22797J3",
    skills: ["Machine Learning", "NumPy", "Regression", "Classification"],
    verifyUrl: "https://www.coursera.org/account/accomplishments/verify/O1XDQ22797J3",
    category: "ai-ml",
    color: "var(--coral)",
  },
  {
    title: "Develop GenAI Apps with Gemini and Streamlit",
    issuer: "Google Cloud Skills Boost",
    issued: "Sep 2025",
    credentialId: "179669a5-8291-4d99-8e96-34bac270a3c3",
    skills: ["Generative AI", "Gemini", "Streamlit", "Python"],
    verifyUrl: "https://www.credly.com/badges/179669a5-8291-4d99-8e96-34bac270a3c3/public_url",
    category: "ai-ml",
    color: "var(--gold)",
  },
  {
    title: "Build Real World AI Applications with Gemini and Imagen",
    issuer: "Google Cloud Skills Boost",
    issued: "Aug 2025",
    credentialId: "e340ec95-9ff4-4664-b0d3-24b124d027c9",
    skills: ["Natural Language Processing (NLP)", "Imagen", "Gemini"],
    verifyUrl: "https://www.credly.com/badges/e340ec95-9ff4-4664-b0d3-24b124d027c9/public_url",
    category: "ai-ml",
    color: "var(--gold)",
  },
  {
    title: "Prompt Design in Vertex AI",
    issuer: "Google Cloud Skills Boost",
    issued: "Aug 2025",
    credentialId: "dd8f2556-80f4-4f38-bb49-f90d7235fcd4",
    skills: ["Artificial Intelligence (AI)", "Generative AI", "Vertex AI", "Prompt Engineering"],
    verifyUrl: "https://www.credly.com/badges/dd8f2556-80f4-4f38-bb49-f90d7235fcd4/public_url",
    category: "ai-ml",
    color: "var(--gold)",
  },
  {
    title: "Intro to Machine Learning",
    issuer: "Kaggle",
    issued: "Jul 2025",
    credentialId: "ankit123789-intro-ml",
    skills: ["Python", "Random Forest", "Machine Learning"],
    verifyUrl: "https://www.kaggle.com/learn/certification/ankit123789/intro-to-machine-learning",
    category: "ai-ml",
    color: "var(--blue)",
  },
  {
    title: "Ultimate React Course 2025",
    issuer: "Udemy",
    issued: "Jul 2025",
    credentialId: "UC-fd60811c-9ecf-45fc-a717-2dc04aaf2ee2",
    skills: ["React.js", "Redux.js", "Next.js", "React Router", "Context API", "React Query", "Tailwind CSS"],
    verifyUrl: "https://www.udemy.com/certificate/UC-fd60811c-9ecf-45fc-a717-2dc04aaf2ee2/",
    category: "web-dev",
    color: "var(--mint)",
  },
  {
    title: "OOPs in C++",
    issuer: "Coding Ninjas",
    issued: "Jun 2024",
    credentialId: "cn-oops-cpp-7180",
    skills: ["Object-Oriented Programming (OOP)", "C++"],
    verifyUrl: "https://files.codingninjas.in/certi_image718037b41aaf0ad6808ac0ad8ffa09fcc394f9.jpg",
    category: "programming",
    color: "var(--blue)",
  },
  {
    title: "Goldman Sachs Job Simulation",
    issuer: "Forage",
    issued: "Oct 2024",
    credentialId: "Dk9CckFM8ZQWwzhZJ",
    skills: ["Cybersecurity", "Password Analysis", "Risk Assessment"],
    verifyUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Goldman%20Sachs/NPdeQ43o8P9HJmJzg_Goldman%20Sachs_LaFAWevNmmFeBNrGE_1728216284129_completion_certificate.pdf",
    category: "professional",
    color: "var(--gold)",
  },
  {
    title: "The Complete JavaScript Course 2024: From Zero to Expert",
    issuer: "Udemy",
    issued: "Sep 2024",
    credentialId: "UC-b0deb1c2-8167-46dd-9e5c-3b202c37d510",
    skills: ["JavaScript", "ES6+", "Babel.js", "Web Development", "DOM Manipulation", "Async/Await", "OOP"],
    verifyUrl: "https://www.udemy.com/certificate/UC-b0deb1c2-8167-46dd-9e5c-3b202c37d510/",
    category: "web-dev",
    color: "var(--mint)",
  },
  {
    title: "Programming in Python",
    issuer: "Kaggle",
    issued: "Sep 2024",
    credentialId: "ankit123789-python",
    skills: ["Python"],
    verifyUrl: "https://www.kaggle.com/learn/certification/ankit123789/python",
    category: "programming",
    color: "var(--blue)",
  },
  {
    title: "Build Responsive Real-World Websites with HTML and CSS",
    issuer: "Udemy",
    issued: "Aug 2024",
    credentialId: "UC-fbe87603-e510-4721-a4df-83e935db91a2",
    skills: ["CSS Flexbox", "CSS Grid", "Responsive Design", "HTML5", "Web Design", "Accessibility"],
    verifyUrl: "https://www.udemy.com/certificate/UC-fbe87603-e510-4721-a4df-83e935db91a2/",
    category: "web-dev",
    color: "var(--mint)",
  },
];

export const codingProfiles = [
  ["GitHub", "Open source repos, experiments, and project code"],
  ["LeetCode", "Competitive programming and DSA problem solving"],
  ["LinkedIn", "Professional network, experience, and endorsements"],
  ["ORCID", "Research identity and scholarly publications"],
  ["Instagram", "Personal creative profile and photography"],
];

export const aboutBlocks = [
  {
    label: "Role",
    value:
      "Software Engineer and NSUT '25 Alumnus with a focused background in Instrumentation & Control, building high-performance web systems and AI integrations.",
  },
  {
    label: "Interests",
    value:
      "Passionate about full-stack engineering, workflow automation (n8n), and deep learning. I actively build tools that bridge the gap between AI and user productivity.",
  },
  {
    label: "Personal",
    value:
      "Beyond technical builds, I'm an avid basketball player (represented NSUT in intercollegiate tournaments) and have a strong creative side in sketching and painting.",
  },
];

export const stackGroups = [
  ["Languages", "C, C++, JavaScript, Python, SQL"],
  ["Frontend", "React, Next.js, HTML5, CSS3, Tailwind CSS, Redux, React Query"],
  ["Backend", "Node.js, Express.js, PostgreSQL, MongoDB, MySQL, Supabase"],
  ["AI & ML", "TensorFlow, NumPy, Pandas, Deep learning, GenAI, Transformers"],
  ["Cloud & Tools", "Git, Azure, Google Cloud, n8n, Vite, Figma, MATLAB"],
];

export const contactChannels = [
  ["Personal Email", "ankitbhardwaj80100@gmail.com"],
  ["Company Email", "polymath@justgotwyrd.com"],
  ["Phone", "+91 9555516408"],
  ["LinkedIn", "linkedin.com/in/ankit-bhardwaj-6b9b62221"],
  ["GitHub", "github.com/Ankit6149"],
  ["LeetCode", "leetcode.com/u/ankit_bh_/"],
  ["ORCID", "orcid.org/0009-0005-3408-0058"],
  ["Instagram", "instagram.com/ankit.bh_"],
];

export const experienceTimeline = [
  {
    period: "April 2026 / Present",
    role: "Software Engineering Intern",
    place: "Wyrd Media Labs",
    summary:
      "Spearheading development of automation workflows and technical systems, contributing to scalable backend architectures.",
    points: ["Automation Workflows", "Backend Scalability", "System Architecture"],
  },
  {
    period: "2022 / Present",
    role: "Competitive Programmer",
    place: "LeetCode & Platforms",
    summary:
      "Actively honing problem-solving skills with a focus on Dynamic Programming, Graphs, and complex algorithmic challenges using C++.",
    points: ["Algorithm Design", "Dynamic Programming", "Graph Theory"],
  },
  {
    period: "2022 / Present",
    role: "Full Stack & AI Engineer",
    place: "Independent Projects",
    summary:
      "Built 'The Wild Oasis' and 'CardXpert AI', focusing on secure authentication, AI recommendation engines, and serverless architectures.",
    points: ["Next.js App Router", "Generative AI", "Workflow Automation"],
  },
  {
    period: "2021 / 2025",
    role: "B.Tech Student (ICE)",
    place: "NSUT, New Delhi",
    summary:
      "Completed degree with a focus on software engineering, deep learning research, and algorithm design.",
    points: ["Instrumentation Core", "Deep Learning Research", "IEEE NSUT Executive"],
  },
  {
    period: "Jun 2024 / Aug 2024",
    role: "Frontend Developer",
    place: "QuickGick",
    summary:
      "Developed a user management app for 50+ users with real-time location tracking and role-based access control using React and Firebase.",
    points: ["React / Redux", "Firebase RBAC", "Google Maps API"],
  },
];

export const quickFacts = [
  ["Primary Role", "Software Engineer"],
  ["Current Focus", "Full Stack Dev, DSA, AI/ML"],
  ["Education", "B.Tech NSUT (2025)"],
  ["High School", "GD Goenka Public School"],
  ["Location", "New Delhi, India"],
];

export const techIcons = [
  { icon: "simple-icons:react", label: "React" },
  { icon: "simple-icons:nextdotjs", label: "Next.js" },
  { icon: "simple-icons:javascript", label: "JavaScript" },
  { icon: "simple-icons:typescript", label: "TypeScript" },
  { icon: "simple-icons:python", label: "Python" },
  { icon: "simple-icons:cplusplus", label: "C++" },
  { icon: "simple-icons:nodedotjs", label: "Node.js" },
  { icon: "simple-icons:express", label: "Express" },
  { icon: "simple-icons:fastapi", label: "FastAPI" },
  { icon: "simple-icons:postgresql", label: "PostgreSQL" },
  { icon: "simple-icons:mongodb", label: "MongoDB" },
  { icon: "simple-icons:mysql", label: "MySQL" },
  { icon: "simple-icons:supabase", label: "Supabase" },
  { icon: "simple-icons:firebase", label: "Firebase" },
  { icon: "simple-icons:tensorflow", label: "TensorFlow" },
  { icon: "simple-icons:pytorch", label: "PyTorch" },
  { icon: "simple-icons:openai", label: "ChatGPT" },
  { icon: "simple-icons:anthropic", label: "Claude" },
  { icon: "simple-icons:googlegemini", label: "Gemini" },
  { icon: "simple-icons:scikitlearn", label: "Scikit-Learn" },
  { icon: "simple-icons:numpy", label: "NumPy" },
  { icon: "simple-icons:pandas", label: "Pandas" },
  { icon: "simple-icons:reactquery", label: "TanStack Query" },
  { icon: "simple-icons:redux", label: "Redux" },
  { icon: "simple-icons:tailwindcss", label: "Tailwind" },
  { icon: "simple-icons:sass", label: "Sass" },
  { icon: "simple-icons:git", label: "Git" },
  { icon: "simple-icons:microsoftazure", label: "Azure" },
  { icon: "simple-icons:googlecloud", label: "GCP" },
  { icon: "simple-icons:vercel", label: "Vercel" },
  { icon: "simple-icons:netlify", label: "Netlify" },
  { icon: "simple-icons:docker", label: "Docker" },
  { icon: "simple-icons:kubernetes", label: "Kubernetes" },
  { icon: "simple-icons:terraform", label: "Terraform" },
  { icon: "simple-icons:graphql", label: "GraphQL" },
  { icon: "simple-icons:n8n", label: "n8n" },
  { icon: "simple-icons:leaflet", label: "Leaflet" },
  { icon: "simple-icons:canva", label: "Canva" },
  { icon: "ant-design:api-outlined", label: "REST APIs" },
  { icon: "simple-icons:vite", label: "Vite" },
  { icon: "simple-icons:figma", label: "Figma" },
  { icon: "simple-icons:html5", label: "HTML5" },
  { icon: "simple-icons:css3", label: "CSS3" },
];
export const directoryLinks = [
  {
    label: "06. ABOUT",
    href: "/about",
    color: "var(--coral)",
    note: "Working Style & Focus: Learn about my engineering philosophy, core stack, and the way I approach scalable system design."
  },
  {
    label: "03. EXPERIENCE",
    href: "/experience",
    color: "var(--mint)",
    note: "Professional Journey: A detailed timeline of my internships, academic progress, and competitive programming achievements."
  },
  {
    label: "05. CREDENTIALS",
    href: "/credentials",
    color: "var(--gold)",
    note: "Certificates & Skills: Verified technical certifications across Data Structures, Algorithms, Web Development, and AI/ML."
  },
  {
    label: "07. CONTACT",
    href: "/contact",
    color: "var(--blue)",
    note: "Let's Connect: Open for software engineering roles. Reach out via email, LinkedIn, or check my code on GitHub."
  }
];

export const resumeData = {
  files: {
    pdf: "/resume/Ankit_Bhardwaj_Resume.pdf",
    docx: "/resume/Ankit_Bhardwaj_Resume.docx",
    preview: "/resume/Ankit_Bhardwaj_Resume_preview.svg",
  },
};
