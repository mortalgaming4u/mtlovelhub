import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => ({
  base: "./", // Ensures relative asset paths for Vercel
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "development" && visualizer({ open: true }),
  ].filter(Boolean),
  resolve: {
    alias: {
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom"],
  },
  build: {
    outDir: "dist", // Explicitly define output folder for Vercel
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react";
            if (id.includes("axios")) return "axios";
            if (id.includes("shadcn-ui")) return "shadcn";
            return "vendor";
          }
        },
      },
    },
  },
}));
