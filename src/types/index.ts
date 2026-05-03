// Shared Types
export interface SanityAsset {
  type: 'image' | 'video'; // video link can be youtube or vimeo
  videoType?: 'sanity' | 'youtube' | 'vimeo'; // identify where the video is from
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
  icon?: SanityAsset;
}

export interface ProjectSummary {
  id: string; // Will map to Sanity's _id or slug
  title: string;
  datetime: string; // ISO String
  shortDescription: string;
  repositoryLink?: string;
  thumbnail?: SanityAsset;
  priorityLevel?: number;
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
  projectId: string; // Used to isolate per project
  title: string; // ### Title
  datetime: string; // ISO String
  description: string; // Markdown
  commitLink?: string;
  assets?: SanityAsset[]; // images or vids or both
}

// isolate through project id
export interface TechStacks {
  type: 'language' | 'deployment' | 'tool' | 'ai-agent' | 'others';
  description?: string; // tech list description
  assets?: SanityAsset[]; // tech list assets
}

export interface ProjectTechnology {
  id: string;
  projectId: string;
  title?: string; // any title 
  description?: string; // project level stacks description
  techStacks: TechStacks[]; // module level list of stacks put in card
}

// isolate through project id
export interface ProjectDeepDive {
  id: string;
  projectId: string;
  title: string; // since its a list, title should be provided to identify each deep dive item
  liveAPIDocumentation?: string; // embed api documentation (such as openapi/swagger) in iframe
  assets?: SanityAsset[];
  description: string; // markdown
  repoLink?: string;
  liveSiteLink?: string;
}

// isolate through project id. Serves as UI gallery for the project
export interface ProjectImages {
  id: string;
  projectId: string;
  title: string; // entry/card level title
  description?: string; // entry/card level description
  contents: SanityAsset[];
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
  
  // Flat Arrays for GROQ alignment
  projectBlogs: ProjectBlogEntry[];
  projectDeepDives: ProjectDeepDive[];
  projectTechnologies: ProjectTechnology[];
  projectImages: ProjectImages[];
}
