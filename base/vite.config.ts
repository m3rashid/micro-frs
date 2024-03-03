import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    modulePreload: true,
    target: 'esnext',
    minify: true,
    cssCodeSplit: false,
  },
});
