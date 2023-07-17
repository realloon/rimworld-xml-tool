import getAllFilesInPath from './utils/getAllFilesInPath.js'
import readFile from './utils/readFile.js'
import convertXmlToJson from './utils/convertXmlToJson.js'
import writeFile from './utils/writeFile.js'

const rootPath = './data/Defs'
const outputPath = './output/bundle.json'

;(async () => {
  try {
    const paths = await getAllFilesInPath(rootPath)

    const xmlStrArray = await Promise.all(paths.map(path => readFile(path)))

    const jsonArray = await Promise.all(
      xmlStrArray.map(xmlString => convertXmlToJson(xmlString))
    )

    const output = jsonArray.flat().filter(item => item !== null)

    await writeFile(outputPath, JSON.stringify(output))
    console.log('成功输出至 output/bundle.json')
  } catch (err) {
    console.error(err)
  }
})()
