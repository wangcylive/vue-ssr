const path = require('path')
// const htmlWebpackPlugin = require('./html-conf')
// const entry = require('./main-conf')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = (mode, env) => {
  const { getCssLoader, getSassLoader, getLessLoader, getFontOptions, getImgOptions } = require('./rules-conf')(mode, env)

  return {
    context: path.resolve(__dirname, '..'),
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.css$/,
          oneOf: [
            {
              resourceQuery: /module/,
              use: getCssLoader(true),
            },
            {
              use: getCssLoader(),
            },
          ],
        },
        {
          test: /\.s[ac]ss$/,
          oneOf: [
            {
              resourceQuery: /module/,
              use: getSassLoader(true),
            },
            {
              use: getSassLoader(),
            },
          ],
        },
        {
          test: /\.less$/,
          oneOf: [
            {
              resourceQuery: /module/,
              use: getLessLoader(true),
            },
            {
              use: getLessLoader(),
            },
          ],
        },
        {
          // 处理图片文件
          test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
          loader: 'url-loader',
          options: getImgOptions(),
        },
        {
          // 处理字体文件
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: getFontOptions(),
        },
      ],
    },

    resolve: {
      extensions: [ '.js', '.vue', '.json' ],

      alias: {
        '@': path.resolve(__dirname, '../src'),
      },
    },

    stats: {
      modules: false,
      children: false,
    },

    plugins: [ new VueLoaderPlugin() ],
  }
}
