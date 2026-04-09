// Shared Types
export interface SanityImage {
  assetUrl: string;
  altText: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface PortfolioBrandIcon {
  portfolioBrandName?: string;
  image?: SanityImage;
}

// Landing Page Interfaces
export interface HomeSection {
  name: string;
  role: string;
  tagline: string;
  selfPortrait: SanityImage;
  links: SocialLink[];
}

export interface AboutSection {
  shortDescription: string;
  personalInformation: { label: string; value: string }[];
  hobbies: string[];
  theWhy: string;
}

export interface TechStackItem {
  name: string;
  category: 'Language' | 'Deployment' | 'Tool' | 'AIAgent';
  iconUrl?: string; // Optional icon for the bento grid
}

export interface ProjectSummary {
  id: string; // Will map to Sanity's _id or slug
  title: string;
  shortDescription: string;
  thumbnail?: SanityImage;
}

export interface ContactSection {
  email: string;
  otherLinks?: SocialLink[];
}

// Blog / Project Detail Page Interfaces
export interface DailyBlogEntry {
  id: string;
  title: string;
  datetime: string; // ISO String
  description: string;
  commitLink?: string;
  images?: SanityImage[];
}

export interface ProjectArchitecture {
  type: 'Video' | 'Diagram';
  url: string;
  description: string;
}

export interface ProjectTechnology {
  name: string;
  whyDescription?: string;
}

export interface ProjectDetails {
  id: string;
  title: string;
  description: string;
  deepDive: string; // Note: In Phase 2, Sanity Portable Text will change this to an array of objects
  repoLink?: string;
  liveSiteLink?: string;
  carousel: SanityImage[];
  dailyBlogs: DailyBlogEntry[];
  documentation: ProjectArchitecture[];
  technologies: ProjectTechnology[];
  uiScreenshots: SanityImage[];
}

// Root Mock Data Interface
export interface PortfolioMockData {
  brand: PortfolioBrandIcon;
  hero: HomeSection;
  about: AboutSection;
  techStacks: TechStackItem[];
  projects: ProjectSummary[];
  contact: ContactSection;
  projectDetailsData: Record<string, ProjectDetails>; // Keyed by project ID for easy lookup
}
