const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    host: "localhost",
    port: 3000,
    proxy: {
      '^/api': {
        target: 'http://localhost:8071',
        changeOrigin: true,
        ws: true,
      },
      // '^/ws': {
      //   target: 'http://localhost:8071',
      //   ws: true,
      // }
    }
  },
  transpileDependencies: true
})