// Portfolio Content and Verified Data for Ankit Bhardwaj
// Voice: Grounded, observant, curious, precise, human

export const personalInfo = {
  name: "Ankit Bhardwaj",
  initials: "AB",
  title: "Software Engineer & Researcher",
  subtitle: "Working across software systems, bio-signal analysis, and human tools",
  eyebrow: "OBSERVE · EXPERIMENT · BUILD",
  headlineMain: "Curiosity is",
  headlineAccent: "the thread",
  bio: "I'm Ankit Bhardwaj — a software engineer and researcher. My path began with questions about living systems and biological feedback, moved through instrumentation and signal analysis, and took form in software as a medium for building tools people can actually rely on.",
  supportingQuote: "“A more curious world is a kinder one.”",
  quoteAuthor: "ANKIT BHARDWAJ",
  footerFlourish: "Ideas flow further when we stay curious.",
  copyright: "ANKIT BHARDWAJ · EST. ∞",
};

export const primaryNavLinks = [
  { label: "Arrival", href: "#hero" },
  { label: "Origin", href: "#story" },
  { label: "Work", href: "#work" },
  { label: "Research", href: "#research" },
  { label: "Beyond", href: "#beyond" },
  { label: "Connect", href: "#connect" },
];

export const deepDoorways = [
  { label: "Detailed About", href: "/about", description: "Background, education, and development journey" },
  { label: "Project Archive", href: "/projects", description: "Full engineering repository and build logs" },
  { label: "Publications", href: "/publications", description: "Academic papers, preprints, and citations" },
  { label: "Credentials", href: "/credentials", description: "Certifications and technical verifications" },
  { label: "Resume", href: "/resume", description: "Curriculum Vitae and professional history" },
];

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

export const projectChapters = [
  {
    id: "skribly",
    index: "01",
    name: "Skribly",
    category: "SYSTEMS & DESKTOP ARCHITECTURE",
    statement: "Leave the note exactly where the thought occurred.",
    summary:
      "A contextual Windows sticky-note and workspace system. Rather than forcing you into a separate note-taking application, Skribly attaches notes, ink, and reminders directly to the active application, browser tab, or document, resurfacing them automatically when that context returns.",
    problemContext:
      "Context switching is the primary friction in knowledge work. When you minimize your active codebase or research document to write a quick reminder, you lose the mental frame of reference that made the note valuable.",
    realEvidence: {
      type: "Desktop System Architecture",
      points: [
        "Native Win32 foreground window detection and contextual hook listeners",
        "Tauri + Rust core managing fast background lifecycle with negligible CPU footprint",
        "Local-first SQLite storage keeping all private notes completely on-device",
        "Instant keyboard summons that float over active workspaces without taking window focus",
      ],
    },
    technologies: ["Tauri", "Rust", "React", "Windows API", "SQLite"],
    status: "Active Product Build",
    href: "https://github.com/Ankit6149/skribly",
    linkText: "View Repository & Architecture",
  },
  {
    id: "signalflow",
    index: "02",
    name: "SignalFlow Studio",
    category: "CONTENT & PRODUCTION PIPELINE",
    statement: "Generation should never erase where an idea originated.",
    summary:
      "An evidence-aware content production studio that unites raw source material, repository references, editable drafts, and publication packaging into one transparent, human-guided workflow.",
    problemContext:
      "Most generative workflows produce isolated blocks of text that sever the connection to raw data, references, and origin reasoning, leaving creators unable to verify claims or preserve their editorial voice.",
    realEvidence: {
      type: "Workflow & Provenance Pipeline",
      points: [
        "Structured multi-stage flow: Source Intake → Context Extraction → Human-in-the-Loop Draft → Package",
        "Interactive canvas timeline displaying reference lineage alongside generated prose",
        "Direct export pipelines formatting deliverables for multiple technical publishing channels",
      ],
    },
    technologies: ["Next.js", "React", "Node.js", "Canvas Pipeline", "Tailwind CSS"],
    status: "Active Product Build",
    href: "https://github.com/Ankit6149/SignalFlow-Studio",
    linkText: "View Repository on GitHub",
  },
];

export const researchStudy = {
  id: "emotion-h-net",
  index: "03",
  title: "Emotion-H Net",
  subtitle: "A Hybrid Transformer Architecture for Emotion Recognition",
  venue: "6th International Conference on Data Sciences and Applications (ICDSA 2025)",
  publisher: "Springer — Lecture Notes in Networks and Systems (LNNS)",
  year: "2025",
  coreQuestion: "What must a neural model see before noisy physiological voltages carry recognizable emotional valence and arousal?",
  abstract:
    "Electroencephalogram (EEG) signals provide an objective window into affective states, but raw recordings suffer from severe noise, high dimensionality, and individual variability. Emotion-H Net introduces a specialized feature selection pipeline combined with four parallel Transformer encoder branches, achieving lightweight inference without sacrificing classification accuracy.",
  verifiedMetrics: [
    { label: "Classification Accuracy", value: "86.82%", detail: "On benchmark DEAP dataset" },
    { label: "AUROC Metric", value: "0.977", detail: "Area under ROC curve" },
    { label: "Extracted Features", value: "164", detail: "Spatio-temporal spectral components" },
    { label: "Transformer Branches", value: "4 Encoders", detail: "Dedicated valence/arousal stages" },
  ],
  methodology: [
    "Preprocessing and band-pass filtering (4–45 Hz) across multi-channel EEG recordings",
    "Extraction of differential asymmetry (DASM) and rational asymmetry (RASM) spectral features",
    "Transformer self-attention layers capturing long-range inter-channel dependencies",
    "Rigorous cross-validation on the standard DEAP affective computing benchmark",
  ],
  href: "https://link.springer.com/chapter/10.1007/978-3-032-15407-1_18",
  linkLabel: "View Springer Publication Chapter",
};

export const humanPursuits = [
  {
    topic: "Drawing & Painting",
    medium: "Botanical watercolor & observational pencil",
    reflection: "Drawing forces quiet observation. You cannot paint a stem or leaf convincingly until you look at how it actually connects to the branch.",
  },
  {
    topic: "Music & Rhythm",
    medium: "Acoustic exploration & listening",
    reflection: "Music is where mathematical timing meets pure human emotion: cadence, space between notes, and harmonic tension that requires no translation.",
  },
  {
    topic: "Basketball",
    medium: "Full-court play & court vision",
    reflection: "A fast, honest game. It demands spatial awareness, reading movement two passes ahead, and the physical discipline of staying grounded under pressure.",
  },
  {
    topic: "Living Systems & Nature",
    medium: "Field botany & biological literature",
    reflection: "Walking through forest trails or reading cellular physiology reminds me that the most resilient systems are adaptive, quiet, and deeply interconnected.",
  },
  {
    topic: "Architecture & Books",
    medium: "Physical space, typography & print",
    reflection: "Appreciating buildings that age gracefully and books set with care. Materials that feel tactile and enduring inspire how software interfaces should feel.",
  },
];

export const contactDetails = {
  email: "ankitbhardwaj80100@gmail.com",
  location: "India · Open to Global Collaborations",
  links: [
    { label: "GitHub", href: "https://github.com/Ankit6149", handle: "@Ankit6149" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ankit-bhardwaj-6b9b62221/", handle: "ankit-bhardwaj" },
    { label: "ORCID", href: "https://orcid.org/0009-0005-3408-0058", handle: "0009-0005-3408-0058" },
    { label: "LeetCode", href: "https://leetcode.com/u/ankit_bh_/", handle: "ankit_bh_" },
    { label: "Instagram", href: "https://www.instagram.com/ankit.bh_/", handle: "@ankit.bh_" },
  ],
};
