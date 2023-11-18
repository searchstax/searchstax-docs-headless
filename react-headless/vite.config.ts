import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  if (command === 'build') {
    return {
      plugins: [react()],
      server: {
        host: true,
        port: 3010,
        watch: {
          usePolling: true
        }
      },
      build: {
        rollupOptions: {
          output: {
            dir: '/app/dist/',
            entryFileNames: 'app.js',
            assetFileNames: 'app.css',
            chunkFileNames: 'chunk.js',
            manualChunks: undefined,
          }
        }
      },
      base: '/modules/searchstax_studio_react/dist/',
    }
  }
  else {
    return {
      plugins: [react()],
      server: {
        host: true,
        port: 3010,
        watch: {
          usePolling: true
        }
      },
    }
  }
})
