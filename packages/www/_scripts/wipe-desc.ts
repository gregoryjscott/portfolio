import { writeMarkdown } from "./util"
import { getResources } from "./get-resources"
import { Resource } from "./types"

const resources: Resource[] = getResources()
const resourcesWithPrompts = resources.filter(r => r.prompt && !r.isIndex)

async function wipeDesc() {
  for (const resource of resourcesWithPrompts) {
    resource.source.markdown.frontmatter.desc = null
    writeMarkdown(
      resource.source.path,
      resource.source.markdown.content,
      resource.source.markdown.frontmatter
    )
  }
  console.log()
}

process.on("unhandledRejection", err => {
  console.error("There was an uncaught error", err)
  process.exit(1)
})

wipeDesc()
