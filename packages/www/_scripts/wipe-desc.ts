import { prepareResources, Resource, writeMarkdown } from "./util"

const directories = ["db", "languages", "os", "tools"]
const resources: Resource[] = prepareResources(directories)
const nonIndexResources = resources.filter(r => !r.isIndex)

async function wipeDesc() {
  console.log(`Wiping desc...`)
  for (const resource of nonIndexResources) {
    resource.source.data.desc = null
    writeMarkdown(resource.path, resource.source.content, resource.source.data)
  }
  console.log()
}

process.on("unhandledRejection", err => {
  console.error("There was an uncaught error", err)
  process.exit(1)
})

wipeDesc()
