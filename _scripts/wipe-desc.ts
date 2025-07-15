import { writeMarkdown } from "./util"
import { getResources } from "./get-resources"
import { Resource } from "./types"

const resources: Resource[] = getResources()
const skills = resources.filter(r => r.isSkill && !r.isIndex)

async function wipeDesc() {
  for (const resource of skills) {
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
