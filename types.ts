export interface CaseStudyStats {
  conversionRate: string;
  loadTime: string;
  monthlyLeads: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  shortDescription: string;
  problem: string;
  solution: string;
  result: string;
  coverImage: string;
  beforeImage: string;
  afterImage: string;
  stats: CaseStudyStats;
  date: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  logo: string;
  image?: string;
  stars?: number;
}

export interface NavLink {
  label: string;
  href: string;
  isPrimary?: boolean;
  /** When true, the nav CTA opens the Calendly popup instead of navigating to href. */
  openCalendly?: boolean;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  includes: string[];
  benefit: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ClientLogo {
  name: string;
  logo: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
  credentials: string[];
}