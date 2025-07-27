import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';


export default defineConfig({
  plugins: [react()],
  test: {
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts'
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
