import { writeMarkdown } from "./util"
import { getResources } from "./get-resources"
import { Resource } from "./types"

const resources: Resource[] = getResources()
const resourcesWithPrompts = resources.filter(r => r.prompt && !r.isIndex)

async function wipeDesc() {
  for (const resource of resourcesWithPrompts) {
    resource.sourceMarkdown.frontmatter.desc = null
    writeMarkdown(
      resource.sourceMarkdown.path,
      resource.sourceMarkdown.content,
      resource.sourceMarkdown.frontmatter
    )
  }
  console.log()
}

process.on("unhandledRejection", err => {
  console.error("There was an uncaught error", err)
  process.exit(1)
})

wipeDesc()
