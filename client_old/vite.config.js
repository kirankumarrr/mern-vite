// import { defineConfig } from 'vite'
// import reactRefresh from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     host: true,
//     port: 3000,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000',
//         changeOrigin: true,
//         secure: false
//       }
//     }
//   },
//   plugins: [reactRefresh()],
//   mode: "development",
//   build: {
//     minify: false,
//   }
// })

import { defineConfig } from 'vite'
import commonjs from '@rollup/plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [commonjs()],
    },
    commonjsOptions: {
      exclude: [/./],
    },
  },
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  },
})