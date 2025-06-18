import * as fs from "fs"
import * as path from "path"
import * as matter from "gray-matter"

const dataDirectory = "_data"
export const resourceDirectories = [
  "db",
  "jobs",
  "languages",
  "os",
  "projects",
  "schools",
  "tools",
]
const prompts = {
  db: title => 
    `Provide a brief one-paragraph summary of the ${title} database.`,
  languages: title =>
    `Provide a brief one-paragraph summary of the ${title} programming language.`,
  os: title => 
    `Provide a brief one-paragraph summary of the ${title} operating system.`,
  tools: title => 
    `Provide a brief one-paragraph summary of the ${title} technology.`,
}

export interface Resource {
  name: string
  href: string
  isIndex: boolean
  prompt: string | null
  source: {
    path: {
      directory: string
      name: string
    }
    content: string
    data: any
  }
  target: {
    path: {
      directory: string
      name: string
    }
    data: any
  }
}

export function getResources(): Resource[] {
  if (!fs.existsSync(dataDirectory)) fs.mkdirSync(dataDirectory)
  const resources: Resource[] = []
  for (const directory of resourceDirectories) {
    const files = fs.readdirSync(directory)
    for (const file of files) {
      const parsedPath = path.parse(file)
      const isIndex = parsedPath.name === "index"
      const sourceFilePath = `${directory}/${parsedPath.name}.md`
      const { content, data } = matter.read(sourceFilePath)

      resources.push({
        name: directory,
        href: isIndex ? `/${directory}/` : `/${directory}/${parsedPath.name}/`,
        isIndex,
        prompt: prompts[directory] ? prompts[directory](data.title) : null,
        source: {
          path: {
            directory,
            name: parsedPath.name,
          },
          content,
          data,
        },
        target: {
          path: {
            directory: `${dataDirectory}/${directory}`,
            name: parsedPath.name,
          },
          data: undefined,
        },
      })
    }
    if (!fs.existsSync(`${dataDirectory}/${directory}`)) {
      fs.mkdirSync(`${dataDirectory}/${directory}`)
    }
  }
  return resources
}
