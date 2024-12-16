import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  envPrefix: 'VITE_',
  preview: {
    port: parseInt(process.env.PORT || '5173'),
    // Required for Railway deployment
    host: '0.0.0.0',
  },
  optimizeDeps: {
    include: ['@influencer-management/shared'],
  },
  resolve: {
    alias: [
      {
        find: '@influencer-management/shared',
        replacement: path.resolve(__dirname, '../../packages/shared/src'),
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
    ],
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.RAILWAY_INTERNAL_URL || 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
    },
    port: parseInt(process.env.PORT || '5173'),
    // Required for Railway deployment
    host: '0.0.0.0',
  },
})
