export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  year: string;
  client: string;
  services: string[];
  tools: string[];
  challenge: string;
  solution: string;
  process: {
    title: string;
    description: string;
  }[];
  gallery: string[];
  results: string[];
  duration?: string;
  team?: string[];
  status?: string;
  visibility?: string;
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  behanceUrl?: string;
  figmaUrl?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
  project?: string;
}