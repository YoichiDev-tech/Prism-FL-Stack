export interface StackPreset {
  id: string;
  name: string;
  description: string;
  tools: string[]; // tool IDs
}

export const presets: StackPreset[] = [
  {
    id: "ai-startup",
    name: "AI Startup Stack",
    description: "Essential tools for building and launching AI-powered products.",
    tools: ["openai", "supabase", "vercel", "claude", "github", "stripe", "resend"],
  },
  {
    id: "indie-maker",
    name: "Indie Maker Stack",
    description: "A lean stack for solo builders shipping fast.",
    tools: ["supabase", "vercel", "resend", "umami", "github", "stripe", "linear"],
  },
  {
    id: "agency",
    name: "Agency Stack",
    description: "Tools for client work, automation, and project delivery.",
    tools: ["notion", "zapier", "figma", "resend", "stripe", "slack", "asana"],
  },
  {
    id: "nocode",
    name: "No-Code Stack",
    description: "Build without writing code.",
    tools: ["webflow", "zapier", "airtable", "make", "notion", "glide", "calendly"],
  },
  {
    id: "fullstack-dev",
    name: "Full-Stack Developer",
    description: "Complete toolset for modern full-stack development.",
    tools: ["github", "vscode", "docker", "kubernetes", "jenkins", "datadog", "sentry"],
  },
  {
    id: "saas-foundation",
    name: "SaaS Foundation",
    description: "Core infrastructure for building scalable SaaS products.",
    tools: ["supabase", "stripe", "auth0", "posthog", "resend", "vercel", "cloudflare"],
  },
  {
    id: "productivity-suite",
    name: "Productivity Suite",
    description: "Maximize your personal and team productivity.",
    tools: ["notion", "linear", "slack", "obsidian", "calendly", "trello", "zapier"],
  },
  {
    id: "ecommerce",
    name: "E-commerce Builder",
    description: "Tools for building and running online stores.",
    tools: ["stripe", "shopify", "mailchimp", "hubspot", "intercom", "google-analytics", "typeform"],
  },
  {
    id: "mobile-app",
    name: "Mobile App Development",
    description: "Tools for building mobile applications.",
    tools: ["firebase", "supabase", "github", "datadog", "sentry", "posthog", "mixpanel"],
  },
  {
    id: "marketing-stack",
    name: "Marketing & Growth",
    description: "Complete marketing toolkit for growth teams.",
    tools: ["hubspot", "mailchimp", "segment", "hotjar", "google-analytics", "typeform", "calendly"],
  },
  {
    id: "design-system",
    name: "Design System Builder",
    description: "Tools for creating and maintaining design systems.",
    tools: ["figma", "sketch", "adobe-xd", "framer", "invision", "canva", "notion"],
  },
  {
    id: "data-science",
    name: "Data Science & ML",
    description: "Tools for data science and machine learning workflows.",
    tools: ["huggingface", "cohere", "replicate", "langchain", "pinecone", "jupyter", "mongodb"],
  },
];
