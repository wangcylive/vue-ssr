const fs = require('fs')
const join = require('path').join

/**
 * 遍历目录
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
function findSync (startPath) {
  const result = []

  function finder (path) {
    let files = fs.readdirSync(path)

    files.forEach((val, index) => {
      let fPath = join(path, val)
      let stats = fs.statSync(fPath)
      if (stats.isDirectory()) {
        finder(fPath)
      }
      if (stats.isFile()) {
        result.push(fPath)
      }
    })

  }

  finder(startPath)
  return result
}

module.exports = findSync
