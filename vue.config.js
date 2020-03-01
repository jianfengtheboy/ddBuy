/*
 * @Author: SunJianFeng
 * @LastEditors: SunJianFeng
 * @Email: jianfengtheboy@163.com
 * @Date: 2019-12-30 00:11:17
 * @LastEditTime: 2020-02-27 12:00:41
 * @Description: 配置文件
 */
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
  runtimeCompiler: true,
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
        target: 'http://api.7-orange.cn:7300/mock/5def6a2d448e330a1116366e/api/',
        ws: true,
        changeOrigin: true
      }
    }
  },
  chainWebpack(config) {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
          symbolId: 'icon-[name]'
      })
      .end()
  }
}
