import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';
import restart from 'vite-plugin-restart';

// Automatically detect all .html files in the src directory
const htmlFiles = fs.readdirSync('./src').filter(file => file.endsWith('.html'));

// Define input entries for Rollup
const inputEntries = Object.fromEntries(
  htmlFiles.map(file => [path.basename(file, '.html'), path.resolve(__dirname, 'src', file)])
);

export default defineConfig({
  root: 'src/', // Source files (where index.html is located)
  publicDir: '../static/', // Path to static assets (files served as-is)
  server: {
    host: true, // Open to local network
    open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if not in a sandbox
  },
  build: {
    outDir: '../dist', // Output folder for the build
    emptyOutDir: true, // Clear the output folder before building
    sourcemap: true, // Include source maps for debugging
    rollupOptions: {
      input: inputEntries // Configure Rollup input to include all HTML files
    }
  },
  plugins: [
    restart({ restart: ['../static/**'] }) // Restart server when static files change
  ]
});
