import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    allowedHosts: true,
  },
  css: {
    devSourcemap: true,
  },
});
