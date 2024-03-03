import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      exposes: {
        bootstrap: './src/exposes/bootstrap',
        main: './src/exposes/main',
      },
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
