import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
    sourcemap: false, // Deshabilitado en producción para mejor rendimiento
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
})