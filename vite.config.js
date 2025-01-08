import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import cesium from "vite-plugin-cesium";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), cesium()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8085,
    open: false,
  },
  devServer: {
    proxy: {
      "/user": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/user/, ""),
      },
    },
  },
});
