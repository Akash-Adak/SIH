// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      // configure the manifest
      manifest: {
        name: 'CitizenConnect',
        short_name: 'CitizenApp',
        description: 'A unified platform for reporting civic and cyber issues.',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        // This tells the plugin to import our custom script into the generated service worker.
        // Make sure the path is correct relative to your project root.
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        importScripts: ['src/sw-custom.js'] 
      },
    })
  ],
})