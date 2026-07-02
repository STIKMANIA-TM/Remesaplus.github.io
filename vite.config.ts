import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        maximumFileSizeToCacheInBytes: 500000, // Permite caché hasta 500KB
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}']
      },
      manifest: {
        name: 'Remesa+',
        short_name: 'Remesa+',
        description: 'Comparador y trazador de remesas para Cuba',
        theme_color: '#003300',
        background_color: '#000000',
        display: 'standalone',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    chunkSizeWarningLimit: 300 // Objetivo < 500KB inicial
  }
})