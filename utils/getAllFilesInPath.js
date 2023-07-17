import fs from 'fs'
import path from 'path'

export default function getAllFilesInPath(rootPath) {
  return new Promise((resolve, reject) => {
    let results = []

    fs.readdir(rootPath, { withFileTypes: true }, (err, files) => {
      if (err) reject(err)

      let pending = files.length
      if (!pending) {
        // 如果没有文件，直接返回
        resolve(results)
        return
      }

      files.forEach(file => {
        if (file.isDirectory()) {
          // 如果是目录，递归调用
          getAllFilesInPath(path.join(rootPath, file.name))
            .then(res => {
              results = results.concat(res)
              if (!--pending) resolve(results)
            })
            .catch(reject)
        } else {
          // 如果是文件，添加到结果数组中
          results.push(path.join(rootPath, file.name))
          if (!--pending) resolve(results)
        }
      })
    })
  })
}
