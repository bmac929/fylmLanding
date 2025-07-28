import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  base: './',  
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react']
  },
  server: {
    port: 5173,
    host: true, // This will listen on all local IPs
    open: true  // This will automatically open the browser
  },
  build: {
    sourcemap: true
  },
  logLevel: 'info'
});