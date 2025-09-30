// Types for API responses
export interface TestimonialAPIResponse {
  status: 'success' | 'error';
  data: TestimonialData[];
  message?: string;
}

export interface TestimonialData {
  nombre_completo: string;
  area: string;
  linkedin: string;
  comentario: string;
}

// Types for application use
export interface Testimonial {
  id: string;
  name: string;
  position: string;
  comment: string;
  linkedin?: string;
  initials: string;
  avatarColor: string;
}

// API configuration types
export interface APIConfig {
  baseUrl: string;
  endpoint: string;
  timeout: number;
  retries: number;
}

// Hook state types
export interface TestimonialsState {
  data: Testimonial[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Error types
export interface APIError {
  message: string;
  status?: number;
  code?: string;
}