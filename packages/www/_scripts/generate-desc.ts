import OpenAI from "openai"
import { writeMarkdown } from "./util"
import { getResources } from "./get-resources"
import { Resource } from "./types"

const resources: Resource[] = getResources()
const skills = resources.filter(r => r.isSkill && !r.isIndex)
const buildPrompt = (technologyName: string, technologyType: string) => `
Write a concise and professional 2–3 sentence description suitable for a software
developer’s portfolio website. Describe what ${technologyName} is and what it's 
commonly used for. The general category of the technology is ${technologyType}.
Focus on the specific technology, avoid promotional language, and assume the reader
has general technical knowledge.`

async function generateDesc() {
  for (const resource of skills) {
    const hasDesc =
      resource.source.markdown.frontmatter.desc &&
      resource.source.markdown.frontmatter.desc.length > 0
    if (hasDesc) continue

    const prompt = buildPrompt(resource.resourceTitle, resource.relationTitle)
    console.log(prompt)
    const promptOutput = (await runPrompt(prompt)).trim()
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
