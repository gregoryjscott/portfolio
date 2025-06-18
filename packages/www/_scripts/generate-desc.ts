import OpenAI from "openai"
import { writeMarkdown } from "./util"
import { getResources, Resource } from "./get-resources"

const resources: Resource[] = getResources()
const resourcesWithPrompts = resources.filter(r => r.prompt && !r.isIndex)

async function generateDesc() {
  for (const resource of resourcesWithPrompts) {
    const hasDesc =
      resource.source.data.desc && resource.source.data.desc.length > 0
    if (hasDesc) continue

    const promptOutput = (await runPrompt(resource.prompt)).trim()
    resource.source.data.desc = promptOutput
    writeMarkdown(
      resource.source.path,
      resource.source.content,
      resource.source.data
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
