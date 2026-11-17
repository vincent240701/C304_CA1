import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Our components are written in .js files (not .jsx), so tell Vite
// to treat JSX inside .js files as JSX.
export default defineConfig({
  plugins: [react({ include: /\.(js|jsx)$/ })],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
});
