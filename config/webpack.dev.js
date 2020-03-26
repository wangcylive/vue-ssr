const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const { development } = require('./env-conf')
const packageJson = require('../package')
const hostIp = require('./host-ip')
const webpackBaseConf = require('./webpack.common')
const serverPort = packageJson.serverPort

// 代理服务器
const testProxyServer = 'https://cmsmp.mianjupark.com' // 测试服
const prodProxyServer = 'https://cms.maskpark.net' // 正式服

module.exports = (env) => {
  process.env.NODE_ENV = development
  const defineEnv = {}
  if (env) {
    Object.entries(env).forEach(([key, value]) => {
      defineEnv[key] = JSON.stringify(value)
      process.env[key] = value
    })
  }
  const apiTarget = env.projectEnv === 'test' ? testProxyServer : prodProxyServer
  return webpackMerge(webpackBaseConf(development, env), {
    mode: development,

    entry: path.resolve(__dirname, '../src/entry-client.js'),

    optimization: {
      runtimeChunk: {
        name: 'manifest',
      },
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -20,
            chunks: 'all',
          },
        },
      },
    },

    resolve: {
      extensions: [ '.js', '.vue', '.json' ],

      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.resolve(__dirname, '../src'),
      },
    },

    output: {
      publicPath: '/',
      filename: '[name].js',
      chunkFilename: '[name].js',
    },

    devtool: 'eval-source-map',

    devServer: {
      contentBase: path.resolve(__dirname, '../src'),
      compress: true,
      port: serverPort,
      historyApiFallback: true,
      host: '0.0.0.0',
      disableHostCheck: true,
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        },
      },
    },


    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(development),
          ...defineEnv
        }
      }),
    ],
  })
}

console.log(`start ${packageJson.name} server:
http://localhost:${serverPort}
http://${hostIp()}:${serverPort}
`)
