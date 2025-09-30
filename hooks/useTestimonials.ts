import { useState, useEffect, useCallback } from 'react';
import { getTestimonials } from '../services/testimonialsService';
import type { TestimonialsState } from '../types/testimonials';

export const useTestimonials = () => {
  const [state, setState] = useState<TestimonialsState>({
    data: [],
    loading: true,
    error: null,
    refetch: () => {}
  });

  const fetchTestimonials = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      console.log('🔄 Loading testimonials...');
      const testimonials = await getTestimonials();
      
      setState(prev => ({
        ...prev,
        data: testimonials,
        loading: false,
        error: null
      }));
      
      console.log(`✅ Successfully loaded ${testimonials.length} testimonials`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load testimonials';
      console.error('❌ Error loading testimonials:', errorMessage);
      
      setState(prev => ({
        ...prev,
        data: [],
        loading: false,
        error: errorMessage
      }));
    }
  }, []);

  // Set refetch function
  useState(() => {
    setState(prev => ({ ...prev, refetch: fetchTestimonials }));
  });

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  return state;
};