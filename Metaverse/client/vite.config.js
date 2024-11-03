import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {} // This ensures that 'process.env' is defined to prevent ReferenceError in the client.
  }
});
