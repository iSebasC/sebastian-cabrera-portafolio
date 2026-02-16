import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import faroUploader from '@grafana/faro-rollup-plugin'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Cargar variables también sin prefijo VITE_ (necesario para secrets del uploader)
  const env = loadEnv(mode, process.cwd(), '')

  const sourceMapsEndpoint = env.FARO_SOURCEMAPS_ENDPOINT
  const sourceMapsApiKey = env.FARO_SOURCEMAPS_API_KEY
  const sourceMapsAppId = env.FARO_SOURCEMAPS_APP_ID
  const sourceMapsStackId = env.FARO_SOURCEMAPS_STACK_ID

  const shouldUploadSourceMaps = Boolean(
    sourceMapsEndpoint && sourceMapsApiKey && sourceMapsAppId && sourceMapsStackId,
  )

  return {
    plugins: [
      react(),
      ...(shouldUploadSourceMaps
        ? [
            faroUploader({
              appName: env.VITE_APP_NAME || 'Portafolio Sebastian',
              endpoint: sourceMapsEndpoint,
              apiKey: sourceMapsApiKey,
              appId: sourceMapsAppId,
              stackId: sourceMapsStackId,
              gzipContents: true,
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        "@": "./",
        "@/components": "./components",
        "@/styles": "./styles",
        "@/lib": "./lib",
      },
    },
    server: {
      host: true,
      port: 3000,
    },
    build: {
      outDir: 'dist',
      // Solo generar sourcemaps cuando se vayan a subir (evita exponerlos en dist por defecto)
      sourcemap: shouldUploadSourceMaps,
      minify: 'terser', // Mejor compresión
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            motion: ['framer-motion'],
            ui: ['@radix-ui/react-avatar', '@radix-ui/react-slot', 'lucide-react']
          }
        }
      },
      chunkSizeWarningLimit: 1000 // Aumentar límite para chunks
    },
    optimizeDeps: {
      include: [
        'react', 
        'react-dom', 
        'framer-motion', 
        'lucide-react',
        '@radix-ui/react-avatar',
        '@radix-ui/react-slot'
      ],
    },
    esbuild: {
      // Optimizaciones de esbuild
      drop: ['console', 'debugger'], // Remover console.log en producción
    }
  }
})