import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  priority = false 
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Generar diferentes versiones de la imagen
  const getOptimizedSrc = (originalSrc: string, format: 'webp' | 'avif' | 'original' = 'original') => {
    if (format === 'original') return originalSrc;
    
    const ext = originalSrc.split('.').pop();
    return originalSrc.replace(`.${ext}`, `.${format}`);
  };

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <picture>
        {/* WebP para navegadores modernos */}
        <source 
          srcSet={getOptimizedSrc(src, 'webp')} 
          type="image/webp"
          onError={() => console.log('WebP no disponible, usando fallback')}
        />
        
        {/* AVIF para máxima compresión (navegadores muy modernos) */}
        <source 
          srcSet={getOptimizedSrc(src, 'avif')} 
          type="image/avif"
          onError={() => console.log('AVIF no disponible, usando fallback')}
        />
        
        {/* Imagen original como fallback */}
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
          className={`
            transition-all duration-300 ease-in-out
            ${loaded ? 'opacity-100' : 'opacity-0'}
            ${error ? 'opacity-50' : ''}
          `}
          style={{
            maxWidth: '100%',
            height: 'auto'
          }}
        />
      </picture>
      
      {/* Loading placeholder */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-full" />
      )}
      
      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 bg-muted rounded-full flex items-center justify-center">
          <span className="text-muted-foreground text-sm">🖼️</span>
        </div>
      )}
    </div>
  );
}