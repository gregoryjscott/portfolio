import * as fs from "fs"
import * as path from "path"
import * as matter from "gray-matter"

const yamlDirectory = "_data"
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
  sourceMarkdown: {
    path: {
      directory: string
      name: string
    }
    content: string
    data: any
  }
  targetYaml: {
    path: {
      directory: string
      name: string
    }
    data: any
  }
}

export function getResources(): Resource[] {
  if (!fs.existsSync(yamlDirectory)) fs.mkdirSync(yamlDirectory)
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
        sourceMarkdown: {
          path: {
            directory,
            name: parsedPath.name,
          },
          content,
          data,
        },
        targetYaml: {
          path: {
            directory: `${yamlDirectory}/${directory}`,
            name: parsedPath.name,
          },
          data: undefined,
        },
      })
    }
    if (!fs.existsSync(`${yamlDirectory}/${directory}`)) {
      fs.mkdirSync(`${yamlDirectory}/${directory}`)
    }
  }
  return resources
}

export function getRelations(resource: Resource): string[] {
  if (!resource.sourceMarkdown.data._links) return []
  const linkRels: string[] = Object.keys(resource.sourceMarkdown.data._links)
  const allowedRelations = ["index", ...resourceDirectories]
  return linkRels.filter(lr => allowedRelations.includes(lr))
}

export function getLinks(
  resource: Resource,
  relation: string
): { href: string }[] {
  if (
    !resource.sourceMarkdown.data._links ||
    !resource.sourceMarkdown.data._links[relation]
  ) {
    return []
  }
  return resource.sourceMarkdown.data._links[relation]
}

export function findResource(
  link: { href: string },
  resources: Resource[]
): Resource {
  const linkedResource = resources.find((r: Resource) => r.href == link.href)
  if (!linkedResource) throw `Didn't find resource ${link.href}`
  return linkedResource
}
