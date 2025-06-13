import OpenAI from "openai"
import { prepareResources, Resource, writeMarkdown } from "./util"

const prompts = [
  {
    resourceName: "db",
    summarize: title =>
      `Provide a brief one-paragraph summary of the ${title} database.`,
  },
  {
    resourceName: "languages",
    summarize: title =>
      `Provide a brief one-paragraph summary of the ${title} programming language.`,
  },
  {
    resourceName: "os",
    summarize: title =>
      `Provide a brief one-paragraph summary of the ${title} operating system.`,
  },
  {
    resourceName: "tools",
    summarize: title =>
      `Provide a brief one-paragraph summary of the ${title} technology.`,
  },
]
const directories = prompts.map(p => p.resourceName)
const resources: Resource[] = prepareResources(directories)
const nonIndexResources = resources.filter(r => !r.isIndex)

async function complete(prompt: string): Promise<string> {
  const client = new OpenAI()
  const response = await client.responses.create({
    model: "o4-mini",
    input: prompt,
  })
  return response.output_text
}

async function generateDesc() {
  console.log(`Filling desc...`)
  for (const resource of nonIndexResources) {
    const hasDesc =
      resource.source.data.desc && resource.source.data.desc.length > 0
    if (hasDesc) continue
    const prompt = prompts.find(p => p.resourceName === resource.name)
    if (!prompt) throw "Missing prompt"
    const summaryPrompt = prompt.summarize(resource.source.data.title).trim()
    const completion = await (await complete(summaryPrompt)).trim()
    resource.source.data.desc = completion
    writeMarkdown(resource.path, resource.source.content, resource.source.data)
  }
}

process.on("unhandledRejection", err => {
  console.error("There was an uncaught error", err)
  process.exit(1)
})

generateDesc()
