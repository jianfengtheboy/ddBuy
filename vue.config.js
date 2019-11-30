const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  outputDir: process.env.VUE_APP_TITLE === 'production' ? 'dist' : 'test',
  assetsDir: '',
  indexPath: 'index.html',
  filenameHashing: true,
  lintOnSave: process.env.NODE_ENV !== 'production',
  runtimeCompiler: false,
  transpileDependencies: [],
  productionSourceMap: false,
  integrity: false,
  configureWebpack:{ 
    resolve:{   
      alias:{
        '@': resolve('src'),
      } 
    }
  },
  devServer:{
    // 跨域  
    port: 8080,
    host: '0.0.0.0',
    open: false,
    https: false,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      // 配置跨域处理 可以设置多个
      '/api': {
        target: 'https://mock.cangdu.org/mock/5d940466d360e8289c6a8eb7/api/',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
