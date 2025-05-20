import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "https://evenezer-tadesse.github.io/Netflix-By-Evenezer/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    manifest: true,
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[hash][extname]",
        entryFileNames: "assets/[name].[hash].js",
      },
    },
  },
});
