import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from "vite-plugin-imp"
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
  plugins: [
    react(),
    vitePluginImp(
      {
        optimize: true,
        libList: [
          {
            libName: "antd",
            libDirectory: "es",
            style: (name) => `antd/es/${name}/style`,
          }
        ],
      },
    ),
  ],
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  },
  server: {
    proxy: {
      "/api/": {
        target: "/",
        changeOrigin: true,
      }
    }
  }
})
