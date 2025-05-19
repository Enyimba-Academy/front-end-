import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env": process.env,
  },
  server: {
    proxy: {
      "/api": {
        target: "https://24.199.124.67:4000",
        changeOrigin: true,
        secure: false, // This will ignore SSL certificate errors in development
      },
    },
  },
});
