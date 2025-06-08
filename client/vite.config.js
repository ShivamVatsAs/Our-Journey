import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // The port your React app will run on
    proxy: {
      // Forwards any request starting with /api to your backend server
      '/api': {
        target: 'http://localhost:5001', // Your Node.js server address
        changeOrigin: true, // Recommended for virtual hosted sites
        secure: false,      // Can be set to false if your backend is not using https
      },
    },
  },
});