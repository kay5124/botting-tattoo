import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import AutoImport from "unplugin-auto-import/vite";
import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";

const buildId = new Date().getTime().toString();

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    cssCodeSplit: true, // 启用 CSS 代码分割
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].${buildId}.js`,
        chunkFileNames: `assets/[name].${buildId}.js`,
        assetFileNames: `assets/[name].${buildId}.[ext]`,
        // entryFileNames: `assets/[name].[hash].js`,
        // chunkFileNames: `assets/[name].[hash].js`,
        // assetFileNames: `assets/[name].[hash].[ext]`,
      },
    },
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    AutoImport({
      imports: ["vue", "vue-router", "vue-i18n", "@vueuse/core", "pinia"],
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: "src/auto-imports.d.ts",
      // 自動生成.eslintrc-auto-import, 生成過一次就註解, 避免bug
      // eslintrc: {
      //   enabled: true,
      // },
    }),
    // @quasar/plugin-vite options list:
    // https://github.com/quasarframework/quasar/blob/dev/vite-plugin/index.d.ts
    quasar({
      sassVariables: "src/quasar-variables.sass",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 8888,
    host: true,
    proxy: {
      "/api": {
        changeOrigin: true,
        target: process.env.VITE_API_URL,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    cors: {
      origin: "*",
    },
  },
});
