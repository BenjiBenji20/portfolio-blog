// Shared Types
export interface SanityImage {
  assetUrl: string;
  altText: string;
}

export interface SocialLink {
  platform: string;
  username?: string;
  iconUrl?: SanityImage;
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

export interface MoreAboutMe {
  headerTitle?: string; // e.g., "About Me", "My Process", "Hobbies"
  description?: string;
  items?: string[];     // For lists like hobbies or research interests
  images?: SanityImage[];
}

export interface AboutSection {
  // Primary Info (The first part people see)
  mainDescription: string;
  personalInformation: { label: string; value: string }[];
  images?: SanityImage[]; // Top-level images for the right column

  // Secondary Info (The "More Items" part)
  moreAboutMe: MoreAboutMe[]; 
}

export interface TechStackItem {
  name: string;
  category: 'Language' | 'Deployment' | 'Tool' | 'AIAgent' | 'Others';
  iconUrl?: string; // Optional icon for the bento grid
}

export interface ProjectSummary {
  id: string; // Will map to Sanity's _id or slug
  title: string;
  shortDescription: string;
  repositoryLink?: string;
  thumbnail?: SanityImage;
}

export interface ProjectSummaries {
  projectSummaries: ProjectSummary[];
}

export interface ContactSection {
  email: string;
  availability?: string;
  location?: string;
  timezone?: string;
  formOptions?: string[];
  socials?: SocialLink[];
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
  projectSummaries: ProjectSummary[];
  contact: ContactSection;
  projectDetailsData: Record<string, ProjectDetails>; // Keyed by project ID for easy lookup
}
