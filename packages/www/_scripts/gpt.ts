import * as fs from "fs"
import OpenAI from "openai"
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

const resources: Resource[] = prepareResources()
const nonIndexResources = resources.filter(r => !r.isIndex)

async function complete(prompt: string): Promise<string> {
  const client = new OpenAI()
  const response = await client.responses.create({
    model: "o4-mini",
    input: prompt,
  })
  return response.output_text
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

wipeDesc()
fillDesc()
