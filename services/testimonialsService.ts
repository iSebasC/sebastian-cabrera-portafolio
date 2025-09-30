import type { TestimonialAPIResponse, TestimonialData, Testimonial, APIConfig } from '../types/testimonials';

// Get environment variables with fallbacks
const getEnvVar = (name: string, fallback: string): string => {
  return (import.meta as any).env?.[name] || fallback;
};

// Configuration
const API_CONFIG: APIConfig = {
  baseUrl: getEnvVar('VITE_API_BASE_URL', 'https://backend-portfolio-production-d539.up.railway.app/api'),
  endpoint: getEnvVar('VITE_TESTIMONIALS_ENDPOINT', 'valoraciones/portfolio'),
  timeout: 10000, // 10 seconds
  retries: 3
};

// Cache management
class APICache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  set(key: string, data: any, ttl: number = 300000) { // 5 minutes default TTL
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get(key: string) {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > cached.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  clear() {
    this.cache.clear();
  }
}

const apiCache = new APICache();

// Utility functions
const generateInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const transformTestimonialData = (data: TestimonialData[]): Testimonial[] => {
  const allColors = [
    'bg-blue-600',      'bg-green-600',     'bg-purple-600',    'bg-pink-600',
    'bg-indigo-600',    'bg-yellow-500',    'bg-red-600',       'bg-teal-600',
    'bg-orange-500',    'bg-cyan-600',      'bg-emerald-600',   'bg-violet-600',
    'bg-fuchsia-600',   'bg-rose-600',      'bg-sky-600',       'bg-lime-600',
    'bg-amber-500',     'bg-blue-500',      'bg-green-500',     'bg-purple-500'
  ];

  return data
    .filter(item => 
      item.nombre_completo && 
      item.comentario && 
      item.nombre_completo.trim() !== '' &&
      item.comentario.trim() !== '' &&
      !item.nombre_completo.toLowerCase().includes('prueba')
    )
    .map((item, index) => {
      // Asegurar que cada testimonio tenga un color único y vibrante
      let color: string;
      if (index < allColors.length) {
        color = allColors[index];
      } else {
        // Si hay más testimonios que colores, usar hash pero evitar repetidos
        const hash = item.nombre_completo.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        color = allColors[hash % allColors.length];
      }
      
      return {
        id: `testimonial-${index + 1}`,
        name: item.nombre_completo.trim(),
        position: item.area && item.area !== '-' ? item.area.trim() : 'Colaborador',
        comment: item.comentario.trim(),
        linkedin: item.linkedin && item.linkedin !== '-' ? item.linkedin : undefined,
        initials: generateInitials(item.nombre_completo),
        avatarColor: color
      };
    });
};

// Main API functions
export const fetchWithTimeout = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export const fetchTestimonialsWithRetry = async (attempt = 1): Promise<TestimonialAPIResponse> => {
  const cacheKey = 'testimonials';
  const cachedData = apiCache.get(cacheKey);
  
  if (cachedData) {
    console.log('📦 Returning cached testimonials data');
    return cachedData;
  }

  const url = `${API_CONFIG.baseUrl}/${API_CONFIG.endpoint}`;
  
  try {
    console.log(`🚀 Fetching testimonials from API (attempt ${attempt})...`);
    
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      throw new APIError(`HTTP ${response.status}: ${response.statusText}`, response.status);
    }

    const data: TestimonialAPIResponse = await response.json();
    
    if (data.status !== 'success') {
      throw new APIError(data.message || 'API returned error status');
    }

    // Cache successful response
    apiCache.set(cacheKey, data, parseInt(getEnvVar('VITE_CACHE_DURATION', '300000')) || 300000);
    
    console.log(`✅ Successfully fetched ${data.data.length} testimonials`);
    return data;

  } catch (error) {
    console.error(`❌ Attempt ${attempt} failed:`, error);

    if (attempt < API_CONFIG.retries) {
      const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
      console.log(`⏳ Retrying in ${delay}ms...`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchTestimonialsWithRetry(attempt + 1);
    }

    throw error instanceof APIError ? error : new APIError(
      error instanceof Error ? error.message : 'Unknown error occurred'
    );
  }
};

export const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const response = await fetchTestimonialsWithRetry();
    const transformedData = transformTestimonialData(response.data);
    
    if (transformedData.length === 0) {
      throw new APIError('No valid testimonials found in response');
    }

    return transformedData;
  } catch (error) {
    console.error('🚨 Failed to get testimonials:', error);
    throw error;
  }
};

// Utility exports
export { apiCache, API_CONFIG };

// Custom error class
class APIError extends Error {
  constructor(message: string, public status?: number, public code?: string) {
    super(message);
    this.name = 'APIError';
  }
}