const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJsPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackBaseConf = require('./webpack.common')
const { production } = require('./env-conf')
const { getAssetsPath } = require('./path-conf')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = (env) => {
  process.env.NODE_ENV = production
  const defineEnv = {}
  if (env) {
    Object.entries(env).forEach(([key, value]) => {
      defineEnv[key] = JSON.stringify(value)
      process.env[key] = value
    })
  }
  const publicPath = '/'

  return webpackMerge(webpackBaseConf(production, env), {
    mode: production,

    entry: path.resolve(__dirname, '../src/entry-server.js'),

    target: 'node',

    // optimization: {
    //   minimizer: [ new TerserJsPlugin({}), new OptimizeCssAssetsPlugin({}) ],
    // },

    output: {
      path: path.resolve('./dist'),
      libraryTarget: 'commonjs2',
      filename: 'server-bundle.js'
    },

    devtool: 'source-map',

    externals: nodeExternals({
      // 不要外置化 webpack 需要处理的依赖模块。
      // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
      // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
      whitelist: /\.css$/
    }),

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(production),
          ...defineEnv
        },
      }),
      new VueSSRServerPlugin()
    ],
  })
}
