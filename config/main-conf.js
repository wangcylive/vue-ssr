const path = require('path')
const findSync = require('./find-path-sync')

const entryPath = findSync('./src/main')

const mainConf = {}

entryPath.forEach(item => {
  const filename = item.split(path.sep).pop()
  const name = filename.substring(0, filename.lastIndexOf('.'))
  mainConf[ name ] = './' + item
})

module.exports = mainConf
