import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import webExtension, { readJsonFile } from 'vite-plugin-web-extension'

function getTarget() {
  return process.env.TARGET || 'chrome';
}

function generateManifest() {
  const manifest = readJsonFile('manifest.json');
  const target = getTarget();
  
  if (target === 'firefox') {
    // Firefox specific adjustments if needed
    // The plugin handles most of it, but we can be explicit
    return {
      ...manifest,
      background: {
        scripts: ["src/background/index.ts"],
        type: "module"
      }
    };
  }
  return manifest;
}

export default defineConfig({
  plugins: [
    react(),
    webExtension({
      manifest: generateManifest,
      browser: getTarget(),
    }),
  ],
})
