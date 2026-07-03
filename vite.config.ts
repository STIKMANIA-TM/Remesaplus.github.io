import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// IMPORTANTE: Cambia 'Remesaplus.github.io' por el nombre exacto de tu repo
// Si tu repo es de usuario (TU-USUARIO.github.io), usa base: '/'
// Si tu repo es de proyecto (TU-USUARIO.github.io/nombre-repo), usa base: '/nombre-repo/'
const repoName = 'Remesaplus.github.io'

export default defineConfig({
  base: `/${repoName}/`,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      workbox: {
        maximumFileSizeToCacheInBytes: 500000,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}']
      },
      manifest: {
        name: 'Remesa+',
        short_name: 'Remesa+',
        description: 'Comparador y trazador de remesas para Cuba',
        theme_color: '#003300',
        background_color: '#000000',
        display: 'standalone',
        start_url: `/${repoName}/`,
        icons: [
          { src: `/${repoName}/icon-192.png`, sizes: '192x192', type: 'image/png' },
          { src: `/${repoName}/icon-512.png`, sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    outDir: 'dist',
    chunkSizeWarningLimit: 300
  }
})