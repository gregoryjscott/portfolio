import * as fs from "fs"
import { Configuration, OpenAIApi } from "openai"
import { encode } from "gpt-3-encoder"
import * as path from "path"
import * as matter from "gray-matter"
import * as prettier from "prettier"

interface Resource {
  name: string
  href: string
  isIndex: boolean
  path: {
    directory: string
    name: string
  }
  source: {
    content: string
    data: any
  }
  target: {
    content: string
    data: any
  }
}

// TODO - read this from /index.md
const directories = ["db", "languages", "os", "tools"]

const prompts = [
  {
    resourceName: "db",
    summarize: title => `Provide a brief summary of the ${title} database.`,
  },
  {
    resourceName: "languages",
    summarize: title =>
      `Provide a brief summary of the ${title} programming language.`,
  },
  {
    resourceName: "os",
    summarize: title =>
      `Provide a brief summary of the ${title} operating system.`,
  },
  {
    resourceName: "tools",
    summarize: title => `Provide a brief summary of the ${title} technology.`,
  },
]

const resources: Resource[] = prepareResources()
const nonIndexResources = resources.filter(r => !r.isIndex)
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })

async function complete(prompt: string): Promise<string> {
  const openai = new OpenAIApi(configuration)
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0,
    max_tokens: 4000,
  })
  const completionText = completion.data.choices[0].text.trim()
  console.log()
  console.log(prompt)
  console.log()
  console.log(completionText)
  console.log(`Prompt chars: `, prompt.length)
  console.log(`Prompt tokens: `, encode(prompt).length)
  console.log(`Completion chars: `, completionText.length)
  console.log(`Completion tokens: `, encode(completionText).length)
  return completion.data.choices[0].text
}

function prepareResources(): Resource[] {
  const resources: Resource[] = []
  for (const directory of directories) {
    const files = fs.readdirSync(directory)
    for (const file of files) {
      const parsedPath = path.parse(file)
      if (file === "index.ts") continue
      const isIndex = parsedPath.name === "index"
      const sourceFilePath = `${directory}/${parsedPath.name}.md`
      const { content, data } = matter.read(sourceFilePath)

      resources.push({
        name: directory,
        href: isIndex ? `/${directory}/` : `/${directory}/${parsedPath.name}/`,
        isIndex,
        path: {
          directory,
          name: parsedPath.name,
        },
        source: {
          content,
          data,
        },
        target: {
          content,
          data: undefined,
        },
      })
    }
  }
  return resources
}

async function fillDesc() {
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
    await delay(5000)
  }
}

async function wipeDesc() {
  console.log(`Wiping desc...`)
  for (const resource of nonIndexResources) {
    resource.source.data.desc = null
    writeMarkdown(resource.path, resource.source.content, resource.source.data)
  }
  console.log()
}

function writeMarkdown(
  path: {
    directory: string
    name: string
  },
  content: string,
  json: any
) {
  const fullPath = `${path.directory}/${path.name}.md`
  console.log(`Writing ${fullPath}`)
  const prettyMarkdown = prettier.format(content, {
    parser: "markdown",
  })
  const text = `${matter.stringify(prettyMarkdown, cleanJSON(json)).trim()}\n`
  const prettyText = prettier.format(text, {
    parser: "markdown",
  })
  fs.writeFileSync(fullPath, prettyText)
}

function cleanJSON(json: any) {
  const jsonText = JSON.stringify(json)
  return JSON.parse(jsonText)
}

process.on("unhandledRejection", err => {
  console.error("There was an uncaught error", err)
  process.exit(1)
})

async function delay(ms: number) {
  console.log()
  console.log(`Waiting ${ms}ms...`)
  return new Promise(resolve => setTimeout(resolve, ms))
}

wipeDesc()
fillDesc()
