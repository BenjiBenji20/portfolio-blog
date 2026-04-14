// Shared Types
export interface SanityAsset {
  type: 'image' | 'video';
  description?: string; // display during lightbox
  assetUrl: string;
  altText: string;
}

export interface SocialLink {
  platform: string;
  username?: string;
  iconUrl?: SanityAsset;
  url: string;
}

export interface PortfolioBrandIcon {
  portfolioBrandName?: string;
  image?: SanityAsset;
}

// Landing Page Interfaces
export interface HomeSection {
  name: string;
  role: string;
  tagline: string;
  selfPortrait: SanityAsset;
  links: SocialLink[];
}

export interface MoreAboutMe {
  headerTitle?: string; // e.g., "About Me", "My Process", "Hobbies"
  description?: string;
  items?: string[];     // For lists like hobbies or research interests
  images?: SanityAsset[];
}

export interface AboutSection {
  // Primary Info (The first part people see)
  mainDescription: string;
  personalInformation: { label: string; value: string }[];
  images?: SanityAsset[]; // Top-level images for the right column

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
  datetime: string; // ISO String
  shortDescription: string;
  repositoryLink?: string;
  thumbnail?: SanityAsset;
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
export interface BlogPreview {
  // uplift-states: HomeSection
  profileDetails: HomeSection; // not use the selfPortrait
  profilePhoto?: SanityAsset; // use this instead
  description: string; // markdown
  carousel: SanityAsset[];
}

// isolate through project id
export interface ProjectBlogEntry {
  id: string;
  title: string; // ### Title
  datetime: string; // ISO String
  description: string; // Markdown
  commitLink?: string;
  assets?: SanityAsset[]; // images or vids or both
}

// isolate through project id
export interface ProjectDocumentation {
  type: 'Video' | 'Diagram';
  url: string;
  description: string;
}

// isolate through project id
export interface ProjectTechnology {
  name: string;
  description?: string;
}

// isolate through project id
export interface ProjectDeepDive {
  description: string; // markdown
  repoLink?: string;
  liveSiteLink?: string;
}

export interface ProjectBlog {
  id: string;
  deepDive: ProjectDeepDive;
  projectBlogs: ProjectBlogEntry[];
  documentation: ProjectDocumentation[];
  technologies: ProjectTechnology[];
  uiScreenshots: SanityAsset[];
}

// Root Mock Data Interface
export interface PortfolioMockData {
  brand: PortfolioBrandIcon;
  hero: HomeSection;
  about: AboutSection;
  techStacks: TechStackItem[];
  projectSummaries: ProjectSummary[];
  contact: ContactSection;
  blogPreview: BlogPreview;
  projectBlogs: Record<string, ProjectBlog>; // Keyed by project ID for easy lookup
}
