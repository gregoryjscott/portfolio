import OpenAI from "openai"
import { writeMarkdown } from "./util"
import { getResources } from "./get-resources"
import { Resource } from "./types"

const resources: Resource[] = getResources()
const resourcesWithPrompts = resources.filter(r => r.prompt && !r.isIndex)

async function generateDesc() {
  for (const resource of resourcesWithPrompts) {
    const hasDesc =
      resource.source.markdown.frontmatter.desc &&
      resource.source.markdown.frontmatter.desc.length > 0
    if (hasDesc) continue

    const promptOutput = (await runPrompt(resource.prompt)).trim()
    resource.source.markdown.frontmatter.desc = promptOutput
    writeMarkdown(
      resource.source.path,
      resource.source.markdown.content,
      resource.source.markdown.frontmatter
    )
  }
}

async function runPrompt(prompt: string): Promise<string> {
  const client = new OpenAI()
  const response = await client.responses.create({
    model: "o4-mini",
    input: prompt,
  })
  return response.output_text
}

process.on("unhandledRejection", err => {
  console.error("There was an uncaught error", err)
  process.exit(1)
})

generateDesc()
