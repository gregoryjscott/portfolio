import * as matter from "gray-matter"
import { writeMarkdown } from "./util"
import {
  Resource,
  findResource,
  findRelationLinks,
  findRelations,
  getResources,
  resourceDirectories,
} from "./get-resources"

const resources: Resource[] = getResources()
const nonIndexResources = resources.filter(r => !r.isIndex)

function fixSelfLinks() {
  for (const resource of resources) {
    const selfLink = findRelationLinks(resource, "self")
    const linkExists =
      selfLink && (!Array.isArray(selfLink) || selfLink.length > 0)

    if (linkExists) {
      if (Array.isArray(selfLink)) {
        console.warn(
          `Resource ${resource.href} has a 'self' link that is an array. It should be a single object.`
        )
      }
      continue
    }

    resource.sourceMarkdown.data._links.self = { href: resource.href }
    writeMarkdown(
      resource.sourceMarkdown.path,
      resource.sourceMarkdown.content,
      resource.sourceMarkdown.data
    )
  }
}

function fixNonIndexLinks() {
  for (const resource of nonIndexResources) {
    const relations = findRelations(resource)
    for (const relation of relations) {
      const links = [].concat(findRelationLinks(resource, relation))

      for (const link of links) {
        const linkedResource = findResource(link, resources)
        if (!linkedResource) continue

        const linkedResourceLinks = [].concat(
          findRelationLinks(linkedResource, resource.name)
        )
        if (!linkedResourceLinks.find(lrl => lrl.href === resource.href)) {
          linkedResource.sourceMarkdown.data._links[resource.name] = [
            ...linkedResource.sourceMarkdown.data._links[resource.name],
            { href: resource.href },
          ]
        }
      }
    }
  }
  for (const resource of nonIndexResources) {
    writeMarkdown(
      resource.sourceMarkdown.path,
      resource.sourceMarkdown.content,
      resource.sourceMarkdown.data
    )
  }
}

function fixIndexLinks() {
  for (const directory of resourceDirectories) {
    const directoryResources = nonIndexResources.filter(
      r => r.name === directory
    )
    if (directoryResources.length === 0) continue
    const filePath = `${directory}/index.md`
    const { content, data } = matter.read(filePath)
    data._links[directory] = directoryResources.map(
      r => r.sourceMarkdown.data._links.self
    )
    writeMarkdown({ directory, name: "index" }, content, data)
  }
}

process.on("unhandledRejection", err => {
  console.error("There was an uncaught error", err)
  process.exit(1)
})

fixSelfLinks()
fixNonIndexLinks()
fixIndexLinks()
