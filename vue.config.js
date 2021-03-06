const path = require('path')
const a = path.join(__dirname, './src/styles/variables.less')
console.log(a)

module.exports = {
  chainWebpack: config => {
    config.devServer.disableHostCheck(true)
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10000 }))
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 配置哪些文件需要自动导入
        path.join(__dirname, './src/styles/variables.less'),
        path.join(__dirname, './src/styles/mixins.less')
      ]
    }
  }
}
