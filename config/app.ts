// Environment configuration with validation
export interface AppConfig {
  api: {
    baseUrl: string;
    testimonialsEndpoint: string;
    timeout: number;
    retries: number;
    cacheDuration: number;
  };
  isDevelopment: boolean;
  isProduction: boolean;
}

// Get environment variable with validation
const getEnvVar = (name: string, fallback: string, required = false): string => {
  const value = (import.meta as any).env?.[name] || fallback;
  
  if (required && !value) {
    throw new Error(`Required environment variable ${name} is not defined`);
  }
  
  return value;
};

// Application configuration
export const appConfig: AppConfig = {
  api: {
    baseUrl: getEnvVar(
      'VITE_API_BASE_URL', 
      'https://backend-portfolio-production-d539.up.railway.app/api'
    ),
    testimonialsEndpoint: getEnvVar(
      'VITE_TESTIMONIALS_ENDPOINT', 
      'valoraciones/portfolio'
    ),
    timeout: parseInt(getEnvVar('VITE_API_TIMEOUT', '10000')),
    retries: parseInt(getEnvVar('VITE_API_RETRIES', '3')),
    cacheDuration: parseInt(getEnvVar('VITE_CACHE_DURATION', '300000'))
  },
  isDevelopment: getEnvVar('NODE_ENV', 'development') === 'development',
  isProduction: getEnvVar('NODE_ENV', 'development') === 'production'
};

// Validate configuration at startup
if (appConfig.isDevelopment) {
  console.log('🚀 App Config:', {
    apiBaseUrl: appConfig.api.baseUrl,
    endpoint: appConfig.api.testimonialsEndpoint,
    environment: appConfig.isDevelopment ? 'development' : 'production'
  });
}