import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        hooks: resolve(__dirname, "hooks.html"),
        "hooks/docs": resolve(__dirname, "hooks/docs.html"),
        skills: resolve(__dirname, "skills.html"),
      },
    },
  },
});
