// Portfolio Content and Verified Data for Ankit Bhardwaj
// Voice: Grounded, observant, curious, precise, human
// Structured precisely according to the approved V1 visual reference (01_Curiosity_in_Bloom & 02_image-gen)

export const personalInfo = {
  name: "Ankit Bhardwaj",
  initials: "AB",
  title: "Builder · Researcher · Lifelong Learner",
  roleDescriptor: "SOFTWARE ENGINEER & RESEARCHER",
  eyebrow: "IDEAS · PEOPLE · SYSTEMS · A KINDER TOMORROW",
  headlineMain: "Curiosity is",
  headlineAccent: "thread",
  bio: "I'm Ankit Bhardwaj — a builder, researcher, and lifelong learner exploring the intersection of software, systems, and human potential. I build things to understand people, solve real problems, and create a kinder, more curious future.",
  supportingQuote: "“A more curious world is a kinder one.”",
  quoteAuthor: "ANKIT BHARDWAJ",
  verticalTags: ["SOFTWARE", "SYSTEMS", "RESEARCH", "CREATIVE", "PEOPLE"],
  ctaPrimary: "Explore My Work",
  ctaSecondary: "Learn More",
  footerFlourish: "Ideas flow further when we stay curious.",
  closingScript: "Let's build a kinder, more curious tomorrow.",
  copyright: "ANKIT BHARDWAJ · EST. ∞",
  email: "ankitbhardwaj80100@gmail.com",
};

export const primaryNavLinks = [
  { label: "Home", href: "#hero" },
  { label: "Story", href: "#story" },
  { label: "Work", href: "#work" },
  { label: "Research", href: "#research" },
  { label: "Beyond", href: "#beyond" },
];

export const deepDoorways = [
  { label: "Detailed About", href: "/about", description: "Background, education, and development journey" },
  { label: "Project Archive", href: "/projects", description: "Full engineering repository and build logs" },
  { label: "Publications", href: "/publications", description: "Academic papers, preprints, and citations" },
  { label: "Credentials", href: "/credentials", description: "Certifications and technical verifications" },
  { label: "Resume", href: "/resume", description: "Curriculum Vitae and professional history" },
];

// The 3 Exploration Pillars directly matching 01_Curiosity_in_Bloom
export const explorationPillars = [
  {
    number: "01.",
    title: "My Story",
    tagline: "A JOURNEY OF CURIOSITY",
    description: "From a small town to global ideas — a journey of questions, lessons, and the moments that keep me curious.",
    linkText: "Read My Story",
    targetId: "story",
    image: "/v1-art/thumb_story.png",
  },
  {
    number: "02.",
    title: "Selected Work",
    tagline: "IDEAS INTO REALITY",
    description: "A few projects that turn questions into products, research into impact, and ideas into real-world value.",
    linkText: "View All Work",
    targetId: "work",
    image: "/v1-art/thumb_work.png",
  },
  {
    number: "03.",
    title: "Research & Writing",
    tagline: "DEEPER EXPLORATIONS",
    description: "Notes, essays, and experiments on people, systems, and what's next.",
    linkText: "Read My Research",
    targetId: "research",
    image: "/v1-art/thumb_research.png",
  },
];

// Featured Projects directly matching 01_Curiosity_in_Bloom & 02_image-gen
export const featuredProjects = [
  {
    id: "skribly",
    name: "Skribly",
    category: "AI STUDY COMPANION · CONTEXTUAL NOTES",
    tag: "AI STUDY COMPANION",
    description: "Turn your notes into understanding with AI-powered learning and contextual workspace capture.",
    image: "/v1-art/thumb_skribly.png",
    githubUrl: "https://github.com/Ankit6149/skribly",
    longSummary:
      "A contextual Windows sticky-note and workspace system. Rather than forcing you into a separate note-taking application, Skribly attaches notes, ink, and reminders directly to the active application, browser tab, or document, resurfacing them automatically when that context returns.",
    keyPoints: [
      "Native Win32 foreground window detection and contextual hook listeners",
      "Tauri + Rust core managing fast background lifecycle with negligible CPU footprint",
      "Local-first SQLite storage keeping all private notes completely on-device",
      "Instant keyboard summons that float over active workspaces without taking window focus",
    ],
    techStack: ["Tauri", "Rust", "React", "Windows API", "SQLite"],
  },
  {
    id: "signalflow",
    name: "SignalFlow Studio",
    category: "SYSTEMS FOR CREATORS · PIPELINE",
    tag: "SYSTEMS FOR CREATORS",
    description: "Tools for clearer thinking, better systems, and creative flow across research and publishing.",
    image: "/v1-art/thumb_signalflow.png",
    githubUrl: "https://github.com/Ankit6149/SignalFlow-Studio",
    longSummary:
      "An evidence-aware content production studio that unifies raw source material, repository references, editable drafts, and publication packaging into one transparent, human-guided workflow.",
    keyPoints: [
      "Structured multi-stage flow: Source Intake → Context Extraction → Human-in-the-Loop Draft → Package",
      "Interactive canvas timeline displaying reference lineage alongside generated prose",
      "Direct export pipelines formatting deliverables for multiple technical publishing channels",
    ],
    techStack: ["Next.js", "React", "Node.js", "Canvas Pipeline", "Tailwind CSS"],
  },
  {
    id: "emotionhnet",
    name: "Emotion-H Net",
    category: "RESEARCH · HUMAN-AI · ICDSA 2025",
    tag: "RESEARCH · HUMAN-AI",
    description: "Exploring affective AI for more empathetic technology through hybrid Transformer architectures.",
    image: "/v1-art/thumb_emotionhnet.png",
    githubUrl: "https://link.springer.com/chapter/10.1007/978-3-032-15407-1_18",
    longSummary:
      "Hybrid Transformer Architecture for Emotion Recognition using physiological bio-signals (EEG). Published in 6th International Conference on Data Sciences and Applications (ICDSA 2025, Springer LNNS).",
    keyPoints: [
      "86.82% Classification Accuracy on benchmark DEAP dataset",
      "0.977 AUROC Metric across continuous arousal and valence states",
      "164 Spatiotemporal Features extracted across multi-channel frequency bands",
      "~5 MB Compact Footprint with 4 dedicated parallel Transformer encoder branches",
    ],
    techStack: ["PyTorch", "Transformers", "EEG Signal Processing", "DEAP Benchmark"],
  },
];

// Story Narrative Arc matching 02_image-gen
export const storyMilestones = [
  {
    number: "01",
    phase: "Observe",
    title: "Living Systems & Biological State",
    cadence: "1998 — 2018",
    prose: "My early curiosity was rooted in living things: observing how organisms maintain equilibrium, how biological sensors adapt to ambient noise, and how complex behavior emerges from simple feedback loops.",
    accent: "Homeostasis · Organic Sensing · Feedback",
  },
  {
    number: "02",
    phase: "Connect",
    title: "Instrumentation, Signals & Control",
    cadence: "2019 — 2022",
    prose: "Studying instrumentation and control theory turned qualitative biological questions into physical measurements: transducers, frequency analysis, noise filtration, and electrical signal propagation. I became fascinated by how much invisible meaning travels through physiological voltages.",
    accent: "Transducers · Frequency Domains · State Estimation",
  },
  {
    number: "03",
    phase: "Build",
    title: "Software as a Living Medium",
    cadence: "2022 — Present",
    prose: "Software became the environment where theoretical models could become tangible. Writing code offered the most direct cycle between hypothesis and verification: building local-first desktop architectures, native hooks, and tools that respect attention rather than fragmenting it.",
    accent: "Local-First · Native APIs · Interface Architecture",
  },
  {
    number: "04",
    phase: "Refine",
    title: "Rigor, Evidence & Human Fit",
    cadence: "Continuing",
    prose: "Good engineering is not just making a model converge or an API respond; it is preserving context, showing what is real, and ensuring technology remains an honest amplifier of human judgment.",
    accent: "Context Preservation · Scientific Validation · Quiet Craft",
  },
];

// Beyond Work Pursuits directly matching 02_image-gen
export const beyondPursuits = [
  {
    icon: "📖",
    title: "Reading",
    subtitle: "Ideas across worlds",
    description: "Books spanning systems biology, philosophy of technology, architecture, and enduring scientific literature.",
  },
  {
    icon: "⛰️",
    title: "Nature",
    subtitle: "A reset button",
    description: "Walking forest trails and quiet natural landscapes to ground thinking away from glowing rectangles.",
  },
  {
    icon: "📷",
    title: "Photography",
    subtitle: "Finding beauty",
    description: "Capturing light, shadows, and subtle textural rhythms in everyday urban and natural environments.",
  },
  {
    icon: "✍️",
    title: "Ideas & Observations",
    subtitle: "Everyday curiosity",
    description: "Maintaining notebooks of small questions, system diagrams, pencil sketches, and personal essays.",
  },
  {
    icon: "☕",
    title: "Good Coffee",
    subtitle: "Essential",
    description: "Slow pour-over rituals in the morning that mark the transition into deep, undisturbed creative focus.",
  },
];

export const socialLinks = [
  { label: "Email", href: "mailto:ankitbhardwaj80100@gmail.com", external: true },
  { label: "GitHub", href: "https://github.com/Ankit6149", external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/ankit-bhardwaj-", external: true },
  { label: "ORCID", href: "https://orcid.org/0009-0000-0938-1662", external: true },
  { label: "LeetCode", href: "https://leetcode.com/u/Ankit_Bhardwaj-/", external: true },
  { label: "Instagram", href: "https://instagram.com/ankitbhardwaj_26", external: true },
];
