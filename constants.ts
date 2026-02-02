import { CaseStudy, Testimonial, NavLink, ProcessStep, Service, FAQ, ClientLogo, TeamMember } from './types';

/**
 * Calendly scheduling URL for the Free Website Audit.
 * Update this when your Calendly event link changes.
 * In Calendly: create an event type, then paste the "Share" link (e.g. https://calendly.com/your-username/30min) here.
 */
export const CALENDLY_SCHEDULING_URL = 'https://calendly.com/your-username/30min';

/**
 * Social profile URLs for the footer.
 */
export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/company/lunic-studio/?viewAsMember=true',
  twitter: 'https://twitter.com',
  instagram: 'https://www.instagram.com/lunicstudio/',
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: 'Work', href: '/#work' },
  { label: 'Process', href: '/#process' },
  { label: 'Blog', href: '/blog' },
  { label: 'Book a quick chat', href: '/#contact', isPrimary: true },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "LUNIC Studio understood our requirements without the typical agency fluff. The resulting site has significantly improved our user engagement from day one.",
    author: "Mark Sutherland",
    role: "Director",
    company: "Sutherland Group",
    logo: "https://cdn.worldvectorlogo.com/logos/google-2015.svg",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
    stars: 5
  },
  {
    quote: "Professional, responsive, and genuinely focused on usability. We've seen a measurable increase in qualified inquiries since the redesign.",
    author: "James Chen",
    role: "Founder",
    company: "Chen Logistics",
    logo: "https://cdn.worldvectorlogo.com/logos/fedex-2.svg",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop",
    stars: 5
  },
  {
    quote: "The strategic approach to our rebranding was refreshing. They didn't just make it look good; they made it work for our business goals.",
    author: "Sarah Mitchell",
    role: "Marketing Director",
    company: "Mitchell & Co",
    logo: "https://cdn.worldvectorlogo.com/logos/airbnb-2.svg",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
    stars: 5
  },
  {
    quote: "Luke took the time to understand our industry and delivered a site that positions us perfectly for high-value contracts. Exceptional work.",
    author: "James Walker",
    role: "Managing Director",
    company: "Walker Construction",
    logo: "https://cdn.worldvectorlogo.com/logos/caterpillar.svg",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
    stars: 5
  },
  {
    quote: "Our conversion rate jumped 40% within the first month. The ROI on this project has been incredible.",
    author: "Emma Thompson",
    role: "CEO",
    company: "Titan Roof Systems",
    logo: "",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
    stars: 5
  },
  {
    quote: "Finally, a designer who speaks business, not just aesthetics. Every decision was backed by strategy and data.",
    author: "David Park",
    role: "Founder",
    company: "Heritage Restorations",
    logo: "",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=200&h=200&auto=format&fit=crop",
    stars: 5
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'professional-services-rebrand',
    title: "Improving lead quality for a national consultancy",
    client: "Sutherland Group",
    date: "Oct 2023",
    shortDescription: "A cluttered interface was obscuring key services. We refined the information architecture and simplified the conversion paths.",
    problem: "The legacy site was difficult to navigate on mobile, leading to high bounce rates and low-quality inquiries.",
    solution: "We implemented a clean, mobile-first design with clear service hierarchies and frictionless contact points.",
    result: "User engagement increased by 40% and the quality of qualified inquiries improved significantly.",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
    beforeImage: "https://picsum.photos/seed/consultingold/600/400",
    afterImage: "https://picsum.photos/seed/consultingnew/600/400",
    stats: {
      conversionRate: "+40%",
      loadTime: "0.8s",
      monthlyLeads: "Focus on Quality"
    }
  },
  {
    slug: 'logistics-platform-ui',
    title: "Streamlining the digital footprint for a logistics provider",
    client: "Chen Logistics",
    date: "Nov 2023",
    shortDescription: "Modernising a text-heavy site to focus on service reliability and ease of contact for B2B partners.",
    problem: "Their online presence didn't reflect their operational scale, making it difficult to build trust with larger corporate clients.",
    solution: "A professional, minimalist UI overhaul focused on clear communication and technical reliability.",
    result: "Successful expansion into corporate contracts, cited by clients as a key trust factor during procurement.",
    coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop",
    beforeImage: "https://picsum.photos/seed/logisticsold/600/400",
    afterImage: "https://picsum.photos/seed/logisticsnew/600/400",
    stats: {
      conversionRate: "Measurable Growth",
      loadTime: "0.6s",
      monthlyLeads: "Increased Retention"
    }
  },
  {
    slug: 'specialist-contractor-portfolio',
    title: "Positioning a specialist team for high-end contracts",
    client: "Elite Contracting",
    date: "Jan 2024",
    shortDescription: "Translating technical expertise into a premium digital experience to attract larger scale projects.",
    problem: "Their work was exceptional, but their digital presence looked amateur, preventing them from winning premium contracts.",
    solution: "A portfolio-focused approach emphasizing clarity, precision, and architectural detail.",
    result: "Now regularly shortlisted for high-value contracts previously out of reach.",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
    beforeImage: "https://picsum.photos/seed/eliteold/600/400",
    afterImage: "https://picsum.photos/seed/elitenew/600/400",
    stats: {
      conversionRate: "Premium Leads",
      loadTime: "1.1s",
      monthlyLeads: "B2B Focus"
    }
  }
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery",
    description: "We start by understanding your business, audience, and goals. Through research and stakeholder interviews, we identify opportunities and pain points.",
    deliverables: ["Competitor Analysis", "User Research", "Goals Definition"]
  },
  {
    number: "02",
    title: "Strategy",
    description: "We define your positioning, map user journeys, and create a conversion-focused sitemap that aligns with your business objectives.",
    deliverables: ["Brand Strategy", "User Flows", "Content Strategy"]
  },
  {
    number: "03",
    title: "Design",
    description: "High-fidelity designs that balance aesthetics with usability. Every element is crafted to guide users toward conversion.",
    deliverables: ["UI/UX Design", "Prototypes", "Design System"]
  },
  {
    number: "04",
    title: "Development",
    description: "Pixel-perfect implementation with clean, performant code. We build for speed, accessibility, and easy content management.",
    deliverables: ["Responsive Build", "CMS Integration", "Testing"]
  },
  {
    number: "05",
    title: "Launch",
    description: "Rigorous QA, SEO setup, and analytics configuration. We ensure everything is optimized before going live.",
    deliverables: ["SEO Setup", "Analytics", "Performance Audit"]
  },
  {
    number: "06",
    title: "Growth",
    description: "Post-launch support, performance monitoring, and iterative improvements based on real user data.",
    deliverables: ["A/B Testing", "Optimization", "Ongoing Support"]
  }
];

export const SERVICES = [
  {
    id: "ui-ux",
    title: "UI/UX Design",
    tagline: "Interfaces that convert",
    description: "User-centered design that reduces friction and guides visitors toward action. We create intuitive experiences backed by research and testing.",
    includes: [
      "User Research & Personas",
      "Information Architecture",
      "Wireframing & Prototyping",
      "High-Fidelity UI Design",
      "Usability Testing",
      "Design Systems"
    ],
    benefit: "Increase conversions by up to 40% with data-driven design decisions."
  },
  {
    id: "web-dev",
    title: "Web Development",
    tagline: "Performance meets precision",
    description: "Fast, accessible, and SEO-optimized websites built with modern technologies. Every line of code serves a purpose.",
    includes: [
      "Responsive Development",
      "CMS Integration",
      "E-commerce Solutions",
      "Performance Optimization",
      "API Integrations",
      "Ongoing Maintenance"
    ],
    benefit: "Sub-second load times that keep visitors engaged and improve rankings."
  },
  {
    id: "brand",
    title: "Brand Identity",
    tagline: "Stand out, stay memorable",
    description: "Strategic branding that communicates your value and builds trust. We craft visual identities that resonate with your target audience.",
    includes: [
      "Brand Strategy",
      "Logo Design",
      "Color & Typography",
      "Brand Guidelines",
      "Marketing Collateral",
      "Social Media Assets"
    ],
    benefit: "Build recognition and trust that turns first-time visitors into loyal customers."
  },
  {
    id: "conversion",
    title: "Conversion Optimization",
    tagline: "Turn traffic into revenue",
    description: "Data-driven improvements that maximize the value of your existing traffic. We identify and eliminate conversion barriers.",
    includes: [
      "Conversion Audits",
      "A/B Testing",
      "Heatmap Analysis",
      "Landing Page Optimization",
      "Funnel Analysis",
      "Performance Tracking"
    ],
    benefit: "Typically see 20-60% improvement in conversion rates within 90 days."
  }
];

export const FAQS = [
  {
    question: "How long does a typical project take?",
    answer: "Most website projects take 6-10 weeks from discovery to launch. Brand identity projects typically run 4-6 weeks. We'll provide a detailed timeline during our initial consultation based on your specific requirements."
  },
  {
    question: "How does pricing work?",
    answer: "We tailor each project to your scope and goals. After we understand your needs, we'll outline options and what to expect - no surprises."
  },
  {
    question: "Do you work with clients outside Australia?",
    answer: "Absolutely. We work with clients globally, with most communication happening via video calls and collaborative tools. Time zone differences are rarely an issue - we adapt our schedule to ensure smooth collaboration."
  },
  {
    question: "What platforms do you build on?",
    answer: "We're platform-agnostic and choose the best solution for your needs. Common choices include Webflow, WordPress, Shopify for e-commerce, and custom React builds for complex applications."
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer: "Yes. Projects usually start with a one-off website build. After launch, we can arrange optional ongoing support - updates, monitoring, and content help - if that fits your needs."
  },
  {
    question: "What do you need from me to get started?",
    answer: "For our discovery call, just bring your goals and challenges. After that, we'll need access to existing brand assets, content, and any analytics data. We guide you through everything step by step."
  }
];

export const CLIENT_LOGOS = [
  { name: "Sutherland Group", logo: "/logos/sutherland.svg" },
  { name: "Chen Logistics", logo: "/logos/chen.svg" },
  { name: "Elite Contracting", logo: "/logos/elite.svg" },
  { name: "Mitchell & Co", logo: "/logos/mitchell.svg" },
  { name: "Walker Construction", logo: "/logos/walker.svg" },
  { name: "Titan Roof Systems", logo: "/logos/titan.svg" }
];

export const TEAM_MEMBERS = [
  {
    name: "Luke Niccol",
    role: "Founder & Lead Designer",
    bio: "With 8+ years in digital design, Luke leads strategy and creative direction. He's passionate about creating websites that work as hard as the businesses they represent.",
    image: "/Assets/bw-portrait.png",
    linkedin: "#",
    credentials: ["UI/UX Design", "Brand Strategy", "Webflow Expert"]
  }
];
