const path = require('path')
const findSync = require('./find-path-sync')
const HtmlConf = require('html-webpack-plugin')
const htmlPath = findSync('./src/html')

const array = []

htmlPath.forEach(item => {
  const filename = item.split(path.sep).pop()

  const chunks = filename.substring(0, filename.lastIndexOf('.'))

  array.push(new HtmlConf({
    template: './' + item,
    filename,
    chunks: [ 'manifest', 'vendors', chunks ]
  }))
})

module.exports = array