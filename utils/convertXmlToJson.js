import { Parser } from 'xml2js'

export default async function convertXmlToJson(xml) {
  const parser = new Parser({
    trim: true,
    explicitArray: false,
  })

  return new Promise((resolve, reject) => {
    parser.parseString(xml, (err, data) => {
      if (err) reject(err)

      const { ThingDef: thingDef } = data.Defs // Cache the data.Defs.ThingDef

      if (!thingDef) resolve(null)

      const defs = Array.isArray(thingDef) ? thingDef : [thingDef] // explicitArray is fasle

      const result = defs // defs is thingDef Object Array
        .filter(def => def.defName)
        .map(def => {
          const { defName, label, description, statBases } = def
          const texPath = def.graphicData?.texPath

          // get the statBases of the parent tag definition.
          const { ParentName: parentName } = def.$
          const parentStatBases = defs.find(
            def => def.$.Name === parentName
          )?.statBases

          return {
            defName,
            label,
            texPath,
            description,
            stats: { ...parentStatBases, ...statBases },
          }
        })

      resolve(result)
    })
  })
}
