'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {  
    // Paths
    assetsSubDirectory: 'static',
    assesPublicPath: './',                         //npm run dev 时出现can not get, 改成'/' ？  打包时再改回 './'
  // proxyTable: {
  //  '/api':{ 
  //    target:"https://localhost:8210",
  //    changeOrigin:true,
  //    pathRewrite:{
  //      '^/api':''                                //重写接口，去掉/paas
  //    }
  //  }
  //},

    // Various Dev Server settings
    host: '192.168.0.12', // can be overwritten by process.env.HOST
    port: 8083, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
   // poll: false,                      // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
  
     devtool: 'source-map',
 
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true, 
    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../../RCS_Server/webpage/index.html'),
    // Paths
    assetsRoot: path.resolve(__dirname, '../../RCS_Server/webpage'),                   //打包根目录
    assetsSubDirectory: 'static',                                     //打包子目录
    assetsPublicPath: './',          
    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular 
  //  static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
