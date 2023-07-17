import fs from 'fs'
import path from 'path'

export default async function readFile(filePath, rootPath = '') {
  // 获取文件的完整路径
  const fullPath = path.join(rootPath, filePath)

  // 判断文件的类型 TODO: 限制为 xml
  fs.stat(fullPath, (err, stats) => {
    if (err || !stats.isFile()) throw err
  })

  return await new Promise((resolve, reject) => {
    fs.readFile(fullPath, 'utf8', (err, data) => {
      if (err) reject(err)

      resolve(data)
    })
  })
}
