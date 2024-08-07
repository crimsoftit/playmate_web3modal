import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import envCompatible from 'vite-plugin-env-compatible';
import tsconfigPaths from "vite-tsconfig-paths";
import nodePolyfills from 'vite-plugin-node-stdlib-browser'

// https://vitejs.dev/config/
export default defineConfig({
  
  plugins: [
    tsconfigPaths(),
    react(),
    //reactRefresh(),
    envCompatible(),
    nodePolyfills(),
  ],
  server: {
    port: 4200
  },
  build: {
    rollupOptions: {
      output: {
        format: "iife"
      }
    }
  },
  envPrefix: "REACT_APP_",
});


