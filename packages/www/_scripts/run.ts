import * as fs from "fs"

const paths = {
  script: process.argv[2],
  data: process.argv[3],
}

run()

// TODO - stream the JSON instead of using disk
async function run() {
  const data = fs.readFileSync(paths.data)
  const json = JSON.parse(data.toString())

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const script = require(`../${paths.script}`)
  const result = await script(json)

  console.log(`Writing ${paths.data}`)
  fs.writeFileSync(paths.data, JSON.stringify(result, null, 2))
}
