/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge')
const tsImportPluginFactory = require('ts-import-plugin')
const pxtoviewport = require('postcss-px-to-viewport')
const autoprefixer = require('autoprefixer')

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              // 按需导入vant插件
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                // 指定样式的路径
                style: name => `${name}/style/less`
              })
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        })
        return options
      })
  },
  css: {
    loaderOptions: {
      // 动端适配方案（vw/vh）
      postcss: {
        plugins: [
          autoprefixer({
            autoprefixer: {
              overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8']
            }
          }),
          pxtoviewport({
            viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
            minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
            unitPrecision: 3 // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
          })
        ]
      },
      // 配置 less主题
      less: {
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            'text-color': '#111',
            'border-color': '#eee',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: 'true; @import "~@/theme/var.less";'
          }
        }
      }
    }
  }
}
