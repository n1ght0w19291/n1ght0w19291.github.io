export const SITE = {
  website: "https://n1ght0w19291.github.io",
  author: "n1ght0w1",
  profile: process.env.PUBLIC_SOCIAL_GITHUB ? process.env.PUBLIC_SOCIAL_GITHUB + "/about" : "/about", // set in .env
  desc: "A space where curiosity becomes code. Exploring web development, software architecture and everything that makes the tech world spin.",
  title: "n1ght0w1's blog",
  ogImage: "devosfera-og.webp", // located in the public folder
  lightAndDarkMode: true,
  postPerIndex: 6,
  postPerPage: 12,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showProjects: true,
  showProjectsInIndex: true, // Show projects in the general paginated list (only if showProjects is true)
  showBackButton: true, // show back button in post detail
  showTagsInCards: true, // show tag pills at the bottom of post cards
  showCoverImages: true, // show cover images (OG) in post cards (requires pnpm build in dev mode)
  indexPostsGrid: true, // show recent/featured posts in grid layout on the home page (like /posts page)
  heroTerminalPrompt: {
    prefix: "~", // highlighted part on the left
    path: "/ready-to-go", // central prompt text
    suffix: "$", // terminal symbol on the right
  },
  backdropEffects: {
    cursorGlow: false, // cursor tracking with soft halo
    grain: true, // background visual noise layer
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "America/Guatemala", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  heroImage: "/assets/images/sky.jpg", // path to hero background image in /public (e.g. "/images/hero.jpg"), leave empty to disable
} as const;
