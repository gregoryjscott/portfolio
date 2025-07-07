import * as fs from "fs"
import * as path from "path"
import * as matter from "gray-matter"
import { Link, Relation, Resource } from "./types"
import rawResources from "../_data/resources.json"

const yamlDirectory = "_data"
export const resourceDirectories = Object.keys(rawResources) as Exclude<
  Relation,
  "self"
>[]

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
        relationTitle: rawResources[directory].title,
        resourceTitle: data.title,
        href: isIndex ? `/${directory}/` : `/${directory}/${parsedPath.name}/`,
        isIndex,
        isSkill: rawResources[directory].is_skill,
        source: {
          path: {
            directory,
            name: parsedPath.name,
          },
          markdown: {
            content,
            frontmatter: data,
          },
        },
        target: {
          path: {
            directory: `${yamlDirectory}/${directory}`,
            name: parsedPath.name,
          },
          yaml: undefined,
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
  if (!resource.source.markdown.frontmatter._links) return []
  const linkRels: string[] = Object.keys(
    resource.source.markdown.frontmatter._links
  )
  const allowedRelationSet = new Set<string>(resourceDirectories)
  return linkRels.filter((lr): lr is Relation => allowedRelationSet.has(lr))
}

export function findRelationLinks(
  resource: Resource,
  relation: Relation
): Link | Link[] {
  const links = resource.source.markdown.frontmatter?._links?.[relation]
  if (!links) {
    return []
  }
  return links
}

export function findResource(link: Link, resources: Resource[]): Resource {
  const linkedResource = resources.find((r: Resource) => r.href == link.href)
  if (!linkedResource) throw `Didn't find resource ${link.href}`
  return linkedResource
}
