import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allow external connections (e.g., Docker)
    port: 5173,
    strictPort: true, // Ensures no port conflicts
    watch: {
      usePolling: true, // Enables polling for file changes
    },
  },
});
