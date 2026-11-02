export const profile = {
  name: "Ashkan Tofangdar",
  className: "Software Developer",
  since: 2017,
  email: "ashkan4472@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/Ashkan4472" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ashkan-tofangdar/" },
    { label: "Resume", href: "https://rxresu.me/ashkan4472/ashkan-tofangdar-full-stack" },
    { label: "Instagram", href: "https://instagram.com/ashk.tr" },
  ],
};

export const sheet: [string, string, string?][] = [
  ["name", "Ashkan Tofangdar"],
  ["class", "Software Developer"],
  ["level", "9+", "XP farming since 2017"],
  ["race", "Human", "passes most CAPTCHAs"],
  ["alignment", "Chaotic Good", "lawful about code style"],
  ["spawn", "Tehran, Iran"],
  ["editor", "Neovim", "btw"],
  ["fuel", "coffee", "input: coffee, output: code"],
  ["languages", "English, Persian"],
];

export const stats = [
  { key: "STR", label: "Back-end", value: 80 },
  { key: "DEX", label: "Front-end", value: 100 },
  { key: "INT", label: "AI / ML", value: 90 },
  { key: "WIS", label: "Architecture", value: 80 },
  { key: "LCK", label: "Friday deploys", value: 20 },
];

export const skillTree = [
  {
    branch: "Front-end",
    skills: ["TypeScript", "Angular", "React", "Next.js", "Svelte", "TanStack", "Redux Toolkit", "Zustand", "Tailwind CSS", "SCSS", "MUI", "Ant Design", "Storybook"],
  },
  {
    branch: "Back-end",
    skills: ["Node.js", "NestJS", "Express", "Fastify", "Go", "Gin", "Fiber", "Python", "Django", "FastAPI", ".NET", "Laravel", "REST", "GraphQL", "gRPC", "WebSockets", "Microservices"],
  },
  {
    branch: "AI sorcery",
    note: "LLMs and image models, trained from scratch, fine-tuned or served privately. No uprisings so far.",
    skills: ["LLMs from scratch", "Fine-tuning", "Small specialized models", "Private LLM stacks", "RAG", "Agents", "Image generation models", "Computer vision"],
  },
  {
    branch: "Mobile",
    skills: ["Flutter", "React Native", "Native Android", "Ionic", "Firebase", "Offline sync", "Push notifications"],
  },
  {
    branch: "Data",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Cassandra", "SQLite", "SQL Server", "Firestore"],
  },
  {
    branch: "Ops",
    skills: ["Docker", "Kubernetes", "GitHub Actions", "GitLab CI/CD", "Jenkins", "Nginx", "Linux"],
  },
  {
    branch: "Testing",
    skills: ["Jest", "Cypress", "Playwright", "Pest"],
  },
  {
    branch: "Worldbuilding",
    note: "Code, 3D, 2D, pixels and the soundtrack. The whole game, solo.",
    skills: ["Godot", "Unity", "Unreal", "Blender", "Pixel art", "Aseprite", "Krita", "Music composition", "Ableton Live"],
  },
  {
    branch: "Artificing",
    skills: ["Embedded systems", "Image processing", "Arduino", "Raspberry Pi", "Web AR"],
  },
];

export type Quest = {
  company: string;
  role: string;
  from: string;
  to: string;
  where?: string;
  url?: string;
  loot: string[];
};

export const quests: Quest[] = [
  {
    company: "Bugloos",
    role: "Senior Front-End Developer",
    from: "06/2026",
    to: "Present",
    where: "Tehran, Iran",
    url: "https://bugloos.nl",
    loot: [
      "Leading front-end development and maintaining the Angular codebase",
      "Using AI coding tools day to day to ship features and releases faster",
      "Keeping the apps healthy through refactoring, performance work and maintenance",
    ],
  },
  {
    company: "Forbix",
    role: "Senior Front-End Developer",
    from: "01/2025",
    to: "02/2026",
    where: "Tehran, Iran",
    url: "https://www.forbix.ir",
    loot: [
      "Rebuilt the whole web app from the new UI/UX designs",
      "Cut load times by 75% with TanStack Query, lazy loading and heavy caching",
      "Worked with the backend team on API contracts and real-time data",
      "Built an internal tool for large dynamic forms with TanStack Form",
    ],
  },
  {
    company: "BerryOnMars",
    role: "Senior Full-Stack Developer",
    from: "06/2023",
    to: "01/2025",
    where: "Germany",
    url: "https://berryonmars.com",
    loot: [
      "Led Angular, React and Next.js apps to a 60% better experience, for devs and users",
      "Built AI automations for the team and AI-driven features for users",
      "Reviewed code, coached teammates and wrote unit and end-to-end tests",
    ],
  },
  {
    company: "Ninipaa",
    role: "Lead Developer & Co-founder",
    from: "05/2020",
    to: "05/2023",
    loot: [
      "Co-founded the company and led a mobile app to 80,000+ users",
      "Built and ran the REST and GraphQL APIs behind it",
      "Cut time-to-market by 20% with Agile practices",
      "Mentored 50+ junior developers and interns",
    ],
  },
  {
    company: "Lingoberry",
    role: "Software Architect",
    from: "03/2021",
    to: "03/2023",
    loot: [
      "Designed a multi-tier architecture for a large-scale web app and a shared one across a product suite",
      "Wrote the coding standards and architecture docs, and mentored junior engineers",
    ],
  },
  {
    company: "SmartX Accelerator",
    role: "Technical Advisor",
    from: "03/2021",
    to: "11/2022",
    loot: [
      "Advised several software projects on technical decisions and troubleshooting",
      "Migrated legacy systems to modern platforms and handled server and network setup",
    ],
  },
  {
    company: "Bittunes",
    role: "Software Developer",
    from: "03/2021",
    to: "02/2022",
    loot: [
      "Designed a modern interface for a large enterprise product",
      "Built REST APIs and web apps with Node.js and React",
    ],
  },
  {
    company: "Goals",
    role: "Mobile Developer",
    from: "04/2021",
    to: "01/2022",
    loot: [
      "Shipped Flutter apps for iOS and Android, lifting engagement by 45%",
      "Took an app from concept to deployment",
    ],
  },
  {
    company: "Swing",
    role: "Full-Stack Developer",
    from: "05/2017",
    to: "08/2020",
    loot: [
      "Built web apps with Angular, React, SailsJS and NestJS",
      "Built backends in Node.js on MongoDB, PostgreSQL and Redis",
      "Shipped REST and GraphQL APIs and real-time features over WebSockets",
      "Helped migrate legacy systems to modern architectures",
    ],
  },
];

export const achievements = [
  {
    title: "Best Paper & Presentation",
    detail: "Improving Attention Stand-alone Process Program (IASPP) with Artificial Intelligence (AI)",
    meta: "Global Interdisciplinary Green Cities Conference · University of Augsburg · 06/2023",
    rarity: "Legendary",
  },
  {
    title: "8th place",
    detail: "Sharif Mobile Programming Marathon (MPM 8). Scored 16.18 against a winning 16.6 after three rounds of judging.",
    meta: "Sharif University · 10/2020",
    rarity: "Epic",
  },
  {
    title: "Scribe",
    detail: "Translated image-processing books into Persian.",
    meta: "Knowledge, shared",
    rarity: "Epic",
  },
  {
    title: "Model maker",
    detail: "Trained my own LLMs and image models.",
    meta: "From scratch, fine-tuned and private",
    rarity: "Legendary",
  },
  {
    title: "Crowd pleaser",
    detail: "Shipped software used by 80,000+ people.",
    meta: "Mobile",
    rarity: "Rare",
  },
];

export const artifacts = [
  {
    name: "ESR diagnostic machine",
    detail: "An Erythrocyte Sedimentation Rate machine for hospitals and labs. Built on ESP32 and Raspberry Pi, with a custom operating system for medical compliance and image processing for accurate readings.",
  },
  {
    name: "Augmented reality cards",
    detail: "Scan the QR code on a business card and the company appears in AR. Built with plain JavaScript and AR.js, and used at international events in Dubai.",
  },
];

export const training = [
  { school: "Hamedan University of Technology", degree: "B.Sc. Computer Engineering", when: "2019 – 2024", note: "GPA 3.8" },
  { school: "Shahid Beheshti University", degree: "B.Sc. Computer Engineering (guest)", when: "2020 – 2021", note: "4 terms, with honors" },
];

export const inventory = [
  { qty: "∞", item: "coffee", note: "primary fuel source" },
  { qty: "1", item: "chef's knife", note: "cooks as much as codes" },
  { qty: "1", item: "pair of headphones", note: "playlist classified" },
  { qty: "1", item: "towel", note: "obviously" },
];
