import * as fs from "fs"
import * as path from "path"
import * as matter from "gray-matter"

const yamlDirectory = "_data"

export const resourceDirectories = [
  "projects",
  "jobs",
  "schools",
  "languages",
  "db",
  "tools",
  "os",
  // resume needs to be last b/c it references other "index" resources
  "resume",
] as const

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

type Relation = typeof resourceDirectories[number] | "self"

export interface Resource {
  relation: Relation
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
        relation: directory,
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

export function findRelations(resource: Resource): Relation[] {
  if (!resource.sourceMarkdown.data._links) return []
  const linkRels: string[] = Object.keys(resource.sourceMarkdown.data._links)
  const allowedRelationSet = new Set<string>(resourceDirectories)
  return linkRels.filter((lr): lr is Relation => allowedRelationSet.has(lr))
}

export function findRelationLinks(
  resource: Resource,
  relation: Relation
): { href: string } | { href: string }[] {
  const links = resource.sourceMarkdown.data?._links?.[relation]
  if (!links) {
    return []
  }
  return links
}

export function findResource(
  link: { href: string },
  resources: Resource[]
): Resource {
  const linkedResource = resources.find((r: Resource) => r.href == link.href)
  if (!linkedResource) throw `Didn't find resource ${link.href}`
  return linkedResource
}
