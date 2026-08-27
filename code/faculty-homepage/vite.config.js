import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  // GitHub Pages project site: /personal-profile/; local / Cloudflare keep "/"
  base: process.env.BASE_PATH || "/",
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
});
