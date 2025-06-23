import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allow external access (Ngrok-compatible)
    port: 5173,
    strictPort: true,
    cors: true,
    hmr: {
      protocol: 'wss',
      host: 'beb5-41-89-198-6.ngrok-free.app',
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
