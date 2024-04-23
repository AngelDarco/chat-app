/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCase",
    },
    postcss: {
      plugins: [
        autoprefixer,
        cssnano({
          preset: "default",
        }),
      ],
    },
  },
  test: {
    // config to vitest
    environment: "jsdom",
    globals: true,
  },
  assetsInclude: ["**/*.glb"],
});
