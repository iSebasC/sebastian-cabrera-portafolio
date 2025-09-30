// Tipos base de Sanity
export interface SanityImageAsset {
  _ref: string;
  _type: 'reference';
}

export interface SanityImage {
  _type: 'image';
  asset: SanityImageAsset;
  _key?: string;
}

export interface SanitySlug {
  _type: 'slug';
  current: string;
}

// Estructura de proyecto desde Sanity
export interface SanityProject {
  _id: string;
  _type: 'project';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  
  // Campos principales
  title: string;
  slug: SanitySlug;
  description: string;
  category: string;
  year: string;
  client: string;
  
  // Imágenes
  mainImage: SanityImage;
  gallery: SanityImage[];
  
  // Detalles del proyecto
  challenge: string;
  solution: string;
  results: string[];
  services: string[];
  tools: string[];
  tags: string[];
  
  // Proceso de trabajo
  process: Array<{
    _key: string;
    title: string;
    description: string;
  }>;
  
  // Metadatos
  layout: 'wide' | 'tall' | 'square';
  duration: string;
  team: string[];
  status: 'completed' | 'in-progress' | 'concept';
  visibility: 'public' | 'private' | 'draft';
  featured: boolean;
  
  // Enlaces externos
  liveUrl?: string;
  githubUrl?: string;
  behanceUrl?: string;
  figmaUrl?: string;
}

// Respuesta de la API de Sanity
export interface SanityApiResponse<T> {
  query: string;
  result: T[];
  syncTags?: string[];
  ms: number;
}

// Estructura de asset de imagen de Sanity
export interface SanityImageAssetFull {
  _id: string;
  _type: 'sanity.imageAsset';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  
  assetId: string;
  extension: string;
  mimeType: string;
  originalFilename: string;
  path: string;
  sha1hash: string;
  size: number;
  uploadId: string;
  url: string;
  
  metadata: {
    _type: 'sanity.imageMetadata';
    blurHash: string;
    dimensions: {
      _type: 'sanity.imageDimensions';
      aspectRatio: number;
      height: number;
      width: number;
    };
    hasAlpha: boolean;
    isOpaque: boolean;
    lqip: string;
    palette: {
      _type: 'sanity.imagePalette';
      dominant: SanityPaletteSwatch;
      darkMuted?: SanityPaletteSwatch;
      darkVibrant?: SanityPaletteSwatch;
      lightMuted?: SanityPaletteSwatch;
      lightVibrant?: SanityPaletteSwatch;
      muted?: SanityPaletteSwatch;
      vibrant?: SanityPaletteSwatch;
    };
  };
}

interface SanityPaletteSwatch {
  _type: 'sanity.imagePaletteSwatch';
  background: string;
  foreground: string;
  population: number;
  title: string;
}

// Tipo adaptado para uso en la aplicación
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  year: string;
  client: string;
  services: string[];
  layout: 'wide' | 'tall' | 'square';
  challenge: string;
  solution: string;
  results: string[];
  gallery: string[];
  tools: string[];
  process: Array<{
    title: string;
    description: string;
  }>;
  tags: string[];
  duration: string;
  team: string[];
  liveUrl?: string;
  githubUrl?: string;
  behanceUrl?: string;
  figmaUrl?: string;
  featured: boolean;
  status: string;
  visibility: string;
}