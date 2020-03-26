const fs = require('fs')
const path = require('path')

function datePad(str) {
  return (str + '').padStart(2, '0')
}

function formatDatetime(timestamp, format = 'yyyy-MM-dd hh:mm:ss') {
  const fDate = new Date(timestamp)

  const year = fDate.getFullYear() + ''
  const month = datePad(fDate.getMonth() + 1)
  const date = datePad(fDate.getDate())
  const hours = datePad(fDate.getHours())
  const minutes = datePad(fDate.getMinutes())
  const seconds = datePad(fDate.getSeconds())

  return format
    .replace('yyyy', year)
    .replace('MM', month)
    .replace('dd', date)
    .replace('hh', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}


function copyDirectory(src, dest) {
  fs.mkdirSync(dest)
  const dirs = fs.readdirSync(src)
  dirs.forEach(function(item){
    const item_path = path.join(src, item)
    const temp = fs.statSync(item_path)
    if (temp.isFile()) {
      fs.copyFileSync(item_path, path.join(dest, item))
    } else if (temp.isDirectory()) {
      copyDirectory(item_path, path.join(dest, item))
    }
  })
}

const dirName = 'dist-backups'
const dirPath = path.resolve(__dirname, `../${dirName}`)
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath)
}

copyDirectory(path.resolve(__dirname, '../dist'), path.resolve(dirPath, formatDatetime(Date.now())))