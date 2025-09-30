import { SanityImage } from '../types/sanity';

// Configuración de Sanity
export const SANITY_CONFIG = {
  projectId: 'kysyrox3',
  dataset: 'production',
  apiVersion: '2021-10-21',
  useCdn: true, // Usar CDN para mejor performance
};

// Base URL para imágenes de Sanity
const SANITY_IMAGE_BASE_URL = `https://cdn.sanity.io/images/${SANITY_CONFIG.projectId}/${SANITY_CONFIG.dataset}`;

// Parámetros de optimización de imágenes
export interface ImageUrlParams {
  width?: number;
  height?: number;
  quality?: number; // 0-100
  format?: 'jpg' | 'png' | 'webp' | 'auto';
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
  crop?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'focalpoint';
  blur?: number; // 0-2000
  sharpen?: number; // 0-100
}

/**
 * Genera una URL optimizada para imágenes de Sanity
 * @param imageRef - Referencia de la imagen (_ref del asset)
 * @param params - Parámetros de optimización
 * @returns URL optimizada de la imagen
 */
export function buildImageUrl(imageRef: string, params: ImageUrlParams = {}): string {
  if (!imageRef) return '';

  // Extraer información del asset reference
  const [, assetId, dimensions, extension] = imageRef.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/) || [];
  
  if (!assetId || !dimensions || !extension) {
    console.warn('Invalid image reference format:', imageRef);
    return '';
  }

  // Construir URL base
  let url = `${SANITY_IMAGE_BASE_URL}/${assetId}-${dimensions}.${extension}`;

  // Agregar parámetros de query
  const queryParams: string[] = [];

  if (params.width) queryParams.push(`w=${params.width}`);
  if (params.height) queryParams.push(`h=${params.height}`);
  if (params.quality) queryParams.push(`q=${Math.max(1, Math.min(100, params.quality))}`);
  if (params.format) queryParams.push(`fm=${params.format}`);
  if (params.fit) queryParams.push(`fit=${params.fit}`);
  if (params.crop) queryParams.push(`crop=${params.crop}`);
  if (params.blur) queryParams.push(`blur=${Math.max(0, Math.min(2000, params.blur))}`);
  if (params.sharpen) queryParams.push(`sharp=${Math.max(0, Math.min(100, params.sharpen))}`);

  if (queryParams.length > 0) {
    url += `?${queryParams.join('&')}`;
  }

  return url;
}

/**
 * Genera URL desde un objeto SanityImage
 * @param image - Objeto imagen de Sanity
 * @param params - Parámetros de optimización
 * @returns URL optimizada de la imagen
 */
export function getImageUrl(image: SanityImage | null, params: ImageUrlParams = {}): string {
  if (!image?.asset?._ref) return '';
  return buildImageUrl(image.asset._ref, params);
}

/**
 * Genera múltiples URLs con diferentes tamaños (responsive)
 * @param image - Objeto imagen de Sanity
 * @param sizes - Array de anchos deseados
 * @returns Objeto con URLs para diferentes tamaños
 */
export function getResponsiveImageUrls(
  image: SanityImage | null,
  sizes: number[] = [400, 800, 1200, 1600]
): { [key: string]: string } {
  if (!image) return {};

  const urls: { [key: string]: string } = {};
  
  sizes.forEach(size => {
    urls[`${size}w`] = getImageUrl(image, { 
      width: size, 
      quality: 85, 
      format: 'webp',
      fit: 'crop'
    });
  });

  return urls;
}

/**
 * Genera el atributo srcSet para imágenes responsive
 * @param image - Objeto imagen de Sanity
 * @param sizes - Array de anchos deseados
 * @returns String con formato srcSet
 */
export function generateSrcSet(
  image: SanityImage | null,
  sizes: number[] = [400, 800, 1200, 1600]
): string {
  if (!image) return '';

  const srcSetItems = sizes.map(size => {
    const url = getImageUrl(image, { 
      width: size, 
      quality: 85, 
      format: 'webp',
      fit: 'crop'
    });
    return `${url} ${size}w`;
  });

  return srcSetItems.join(', ');
}

/**
 * Obtiene la URL del placeholder LQIP (Low Quality Image Placeholder)
 * Esta función necesitaría acceso a los metadatos de la imagen
 * Por ahora, genera un placeholder básico
 * @param image - Objeto imagen de Sanity
 * @returns URL del placeholder
 */
export function getPlaceholderUrl(image: SanityImage | null): string {
  if (!image) return '';
  
  return getImageUrl(image, { 
    width: 20, 
    height: 20, 
    blur: 50, 
    quality: 20,
    format: 'webp'
  });
}

// Presets comunes para diferentes usos
export const IMAGE_PRESETS = {
  hero: { width: 1920, height: 1080, quality: 90, format: 'webp' as const, fit: 'crop' as const },
  card: { width: 800, height: 600, quality: 85, format: 'webp' as const, fit: 'crop' as const },
  thumbnail: { width: 400, height: 300, quality: 80, format: 'webp' as const, fit: 'crop' as const },
  gallery: { width: 1200, height: 800, quality: 85, format: 'webp' as const, fit: 'crop' as const },
  avatar: { width: 200, height: 200, quality: 85, format: 'webp' as const, fit: 'crop' as const, crop: 'center' as const },
};