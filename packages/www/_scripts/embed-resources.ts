import * as fs from "fs"
import * as YAML from "yaml"
import * as path from "path"
import * as matter from "gray-matter"
import {
  dataDirectory,
  prepareResources,
  Resource,
  writeMarkdown,
} from "./util"
import { sortEmbedded } from "./sort-embedded"

const directories = [
  "db",
  "jobs",
  "languages",
  "os",
  "projects",
  "schools",
  "tools",
]
const resources: Resource[] = prepareResources(directories)
const nonIndexResources = resources.filter(r => !r.isIndex)
const indexResources = resources.filter(r => r.isIndex)

function fixSelfLinks() {
  for (const resource of resources) {
    const links = getLinks(resource, "self")
    if (links.length > 0) continue
    resource.source.data._links.self = { href: resource.href }
    writeMarkdown(resource.path, resource.source.content, resource.source.data)
  }
}

function fixNonIndexLinks() {
  for (const resource of nonIndexResources) {
    const relations = getRelations(resource)
    for (const relation of relations) {
      const links = getLinks(resource, relation)
      for (const link of links) {
        const linkedResource = getResource(link)
        const linkedResourceLinks = getLinks(linkedResource, resource.name)
        if (!linkedResourceLinks.find(lrl => lrl.href === resource.href)) {
          if (!linkedResource.source.data._links[resource.name]) {
            linkedResource.source.data._links[resource.name] = []
          }
          linkedResource.source.data._links[resource.name].push({
            href: resource.href,
          })
        }
      }
    }
  }
  for (const resource of nonIndexResources) {
    writeMarkdown(resource.path, resource.source.content, resource.source.data)
  }
}

async function fixIndexLinks() {
  for (const directory of directories) {
    const directoryResources = nonIndexResources.filter(
      r => r.name === directory
    )
    const filePath = `${directory}/index.md`
    const { content, data } = matter.read(filePath)
    data._links[directory] = directoryResources.map(
      r => r.source.data._links.self
    )
    writeMarkdown({ directory, name: "index" }, content, data)
  }
}

function embedLinkedResources(
  resourcesToUpdate: Resource[],
  version: "source" | "target"
) {
  for (const resource of resourcesToUpdate) {
    resource.target.data = { ...resource.source.data }
    const relations = getRelations(resource)
    for (const relation of relations) {
      const links = getLinks(resource, relation)
      const linkedResources = links.map(link => {
        const linkedResource = getResource(link)
        return { ...linkedResource[version].data }
      })
      if (!resource.target.data._embedded) resource.target.data._embedded = {}
      resource.target.data._embedded[relation] = linkedResources
    }
    const path = {
      directory: `${dataDirectory}/${resource.path.directory}`,
      name: resource.path.name,
    }
    writeYAML(path, resource.target.data)
  }
}

function sortEmbeddedResources(resources: Resource[]) {
  for (const resource of resources) {
    resource.target.data = sortEmbedded(resource.target.data)
    const path = {
      directory: `${dataDirectory}/${resource.path.directory}`,
      name: resource.path.name,
    }
    writeYAML(path, resource.target.data)
  }
}

function getRelations(resource): any[] {
  if (!resource.source.data._links) return []
  const linkRels: string[] = Object.keys(resource.source.data._links)
  const allowedRelations = ["index", ...directories]
  return linkRels.filter(lr => allowedRelations.includes(lr))
}

function getLinks(resource, relation): any[] {
  if (!resource.source.data._links || !resource.source.data._links[relation])
    return []
  return resource.source.data._links[relation]
}

function getResource(link) {
  const linkedResource = resources.find(r => r.href == link.href)
  if (!linkedResource) throw `Didn't find resource ${link.href}`
  return linkedResource
}

function writeYAML(
  path: {
    directory: string
    name: string
  },
  json: any
) {
  const fullPath = `${path.directory}/${path.name}.yml`
  console.log(`Writing ${fullPath}`)
  const text = YAML.stringify(cleanJSON(json)).trim()
  fs.writeFileSync(fullPath, text)
}

function cleanJSON(json: any) {
  const jsonText = JSON.stringify(json)
  return JSON.parse(jsonText)
}

process.on("unhandledRejection", err => {
  console.error("There was an uncaught error", err)
  process.exit(1)
})

fixSelfLinks()
fixNonIndexLinks()
fixIndexLinks()
embedLinkedResources(nonIndexResources, "source")
embedLinkedResources(indexResources, "target")
sortEmbeddedResources(resources)
