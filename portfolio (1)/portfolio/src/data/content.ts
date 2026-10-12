// Editable site content.
// Phase 4 will move this data into Supabase so it can be managed from /admin.
// Only add facts you can verify. Leave fields empty rather than inventing them.

export type ProjectStatus = "live" | "in_development";

export type Project = {
  slug: string;
  title: string;
  category: "Web Application" | "Client Work" | "Community" | "Tools";
  status: ProjectStatus;
  summary: string;
  description: string;
  /** Leave empty until confirmed. The site shows nothing for an empty list. */
  technologies: string[];
  clientWork?: boolean;
  featured?: boolean;
  liveUrl?: string;
  /** Path under /public, e.g. "/projects/resto-pos-pro.png". Empty = placeholder. */
  image?: string;
};

export const profile = {
  name: "Akomolafe Emmanuel",
  nickname: "Emmy Saint",
  roles: ["Web Developer", "Application Developer", "Social Media Manager"],
  intro:
    "I build web applications and digital products, and I manage social media content for brands and creators.",
  about:
    "I am a computer engineering student building web and mobile applications by shipping real products. I also manage social media accounts, creating and scheduling content for them.",
  /** WhatsApp number in international format, no "+" or leading 0. Not shown as text on the site. */
  whatsappNumber: "2348165784990",
  /** TODO: add your LinkedIn profile URL. Empty = show the name only. */
  linkedinUrl: "",
  linkedinName: "Akomolafe Emmanuel",
};

export const socialAccounts = [
  {
    platform: "TikTok",
    name: "BigTalk",
    url: "", // TODO: add the TikTok profile URL for the managed account
    note: "Managed account. Bible stories and encouragement content.",
  },
  {
    platform: "YouTube",
    name: "Big Kingdom Talk",
    url: "https://youtube.com/@kingdomvoicesnet",
    note: "Managed channel.",
  },
];

export const projects: Project[] = [
  {
    slug: "resto-pos-pro",
    title: "Resto POS Pro",
    category: "Web Application",
    status: "live",
    featured: true,
    summary: "Restaurant point-of-sale system for orders, menus, payments and split bills.",
    description:
      "A restaurant point-of-sale system for taking orders, managing menu items by category, handling pickup and other order types, applying discounts and tax, and processing payments, including split payments.",
    technologies: [],
    liveUrl: "https://restopro.codehas.net/auth/login",
  },
  {
    slug: "emmy-store",
    title: "Emmy Store",
    category: "Client Work",
    status: "live",
    clientWork: true,
    summary: "Client online store with sign-up, login, product search and a shopping cart.",
    description:
      "An online store built for a client, with account registration and login, product search, and a shopping cart.",
    technologies: [],
  },
  {
    slug: "saint-store",
    title: "Saint Store",
    category: "Client Work",
    status: "live",
    clientWork: true,
    summary: "Client online store with categories, search, pricing, a wishlist and a cart.",
    description:
      "An online store built for a client, with product categories, search, product listings showing pricing and discounts, a wishlist, and a shopping cart.",
    technologies: [],
  },
  {
    slug: "emmy-tech-community",
    title: "Emmy Tech Community",
    category: "Community",
    status: "live",
    featured: true,
    summary: "Beginner-friendly community site with roadmaps, project ideas, mentorship and sign-up.",
    description:
      "A community website for beginners in web development, data science, machine learning and design, with learning roadmaps, project ideas, and mentorship.",
    technologies: [],
  },
  {
    slug: "saint-tv",
    title: "Saint TV",
    category: "Web Application",
    status: "live",
    featured: true,
    summary: "Video streaming platform with working features and a landing page.",
    description:
      "A video streaming platform with working features, presented with a bold landing page.",
    technologies: [],
  },
  {
    slug: "daily-path",
    title: "Daily Path",
    category: "Web Application",
    status: "in_development",
    summary: "Daily routine tracker for building and checking off habits and tasks.",
    description: "A daily routine tracker for building and checking off habits and tasks. Still in development.",
    technologies: [],
  },
  {
    slug: "ironpath",
    title: "Ironpath",
    category: "Web Application",
    status: "in_development",
    summary: "Gym web app for tracking workouts and training progress.",
    description: "A gym web app for tracking workouts and training progress. Still in development. (Placeholder name.)",
    technologies: [],
  },
  {
    slug: "tokdrop",
    title: "TokDrop",
    category: "Tools",
    status: "in_development",
    summary: "A tool for saving TikTok videos. In development and not publicly available.",
    description:
      "A tool for saving TikTok videos to a device, with quality options. Still in development and not publicly available yet.",
    technologies: [],
  },
];
