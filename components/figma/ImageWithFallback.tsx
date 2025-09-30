import React, { useState, useCallback, useMemo } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

const LOADING_IMG_SRC = 
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0ic3Bpbm5lci1ncmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMzMzIiBzdG9wLW9wYWNpdHk9IjAuMSIvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMzMzMiIHN0b3Atb3BhY2l0eT0iMC42Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMzAiIHN0cm9rZT0idXJsKCNzcGlubmVyLWdyYWRpZW50KSIgc3Ryb2tlLXdpZHRoPSI0IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1kYXNoYXJyYXk9IjE1MCAzMCI+CjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgYXR0cmlidXRlVHlwZT0iWE1MIiB0eXBlPSJyb3RhdGUiIHZhbHVlcz0iMCA0MCA0MDszNjAgNDAgNDAiIGR1cj0iMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CjwvY2lyY2xlPgo8L3N2Zz4K'

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  lazy?: boolean
  priority?: boolean
  sizes?: string
}

export const ImageWithFallback = React.memo<ImageWithFallbackProps>(function ImageWithFallback({
  src,
  alt,
  style,
  className,
  lazy = true,
  priority = false,
  sizes,
  ...rest
}) {
  const [didError, setDidError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = useCallback(() => {
    setDidError(true)
    setIsLoading(false)
  }, [])

  const handleLoad = useCallback(() => {
    setIsLoading(false)
  }, [])

  // Optimizar URLs y generar diferentes formatos
  const { optimizedSrc, webpSrc, avifSrc } = useMemo(() => {
    if (!src || didError) return { optimizedSrc: src, webpSrc: null, avifSrc: null }

    // Para URLs de Unsplash
    if (typeof src === 'string' && src.includes('images.unsplash.com')) {
      const optimizedUrl = src.replace(/w=\d+/g, 'w=800')
                             .replace(/q=\d+/g, 'q=75')
      return { optimizedSrc: optimizedUrl, webpSrc: null, avifSrc: null }
    }
    
    // Para imágenes locales, generar versiones optimizadas
    if (typeof src === 'string' && src.startsWith('/img/')) {
      const ext = src.split('.').pop()
      const baseName = src.replace(`.${ext}`, '')
      
      return {
        optimizedSrc: src,
        webpSrc: `${baseName}.webp`,
        avifSrc: `${baseName}.avif`
      }
    }
    
    return { optimizedSrc: src, webpSrc: null, avifSrc: null }
  }, [src, didError])

  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
        style={style}
        role="img"
        aria-label={`Error loading ${alt || 'image'}`}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img 
            src={ERROR_IMG_SRC} 
            alt="Error loading image" 
            {...rest} 
            data-original-url={src}
            loading="eager"
          />
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className ?? ''}`} style={style}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-inherit">
          <img 
            src={LOADING_IMG_SRC} 
            alt="Loading..." 
            className="w-12 h-12 opacity-50"
            loading="eager"
          />
        </div>
      )}
      
      {/* Usar picture para formatos modernos cuando están disponibles */}
      {webpSrc || avifSrc ? (
        <picture>
          {/* AVIF para máxima compresión */}
          {avifSrc && (
            <source 
              srcSet={avifSrc} 
              type="image/avif"
              sizes={sizes}
            />
          )}
          
          {/* WebP para navegadores modernos */}
          {webpSrc && (
            <source 
              srcSet={webpSrc} 
              type="image/webp"
              sizes={sizes}
            />
          )}
          
          {/* Imagen original como fallback */}
          <img 
            src={optimizedSrc} 
            alt={alt} 
            className={`w-full h-full ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            loading={priority ? 'eager' : (lazy ? 'lazy' : 'eager')}
            decoding="async"
            onError={handleError}
            onLoad={handleLoad}
            {...rest} 
          />
        </picture>
      ) : (
        <img 
          src={optimizedSrc} 
          alt={alt} 
          className={`w-full h-full ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          loading={priority ? 'eager' : (lazy ? 'lazy' : 'eager')}
          decoding="async"
          onError={handleError}
          onLoad={handleLoad}
          sizes={sizes}
          {...rest} 
        />
      )}
    </div>
  )
})
