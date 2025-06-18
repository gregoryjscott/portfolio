import { writeMarkdown } from "./util"
import { getResources, Resource } from "./get-resources"

const resources: Resource[] = getResources()
const resourcesWithPrompts = resources.filter(r => r.prompt && !r.isIndex)

async function wipeDesc() {
  for (const resource of resourcesWithPrompts) {
    resource.source.data.desc = null
    writeMarkdown(
      resource.source.path,
      resource.source.content,
      resource.source.data
    )
  }
  console.log()
}

process.on("unhandledRejection", err => {
  console.error("There was an uncaught error", err)
  process.exit(1)
})

wipeDesc()
