import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // 修复模块化问题的配置
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React相关依赖
          if (id.includes('react') || id.includes('react-dom')) {
            return 'vendor-react';
          }
          // Supabase
          if (id.includes('@supabase')) {
            return 'vendor-supabase';
          }
          // 其他node_modules依赖
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    // 现代浏览器目标
    target: 'es2020',
    minify: 'terser',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
  // 环境变量定义
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
  // 开发服务器配置
  server: {
    port: 5173,
    host: '0.0.0.0',
  },
  // 预览服务器配置  
  preview: {
    port: 4173,
    host: '0.0.0.0',
  },
  // 优化配置
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@supabase/supabase-js'
    ],
  },
})

