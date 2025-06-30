import { writeYAML } from "./util"
import { sortEmbedded } from "./sort-embedded"
import {
  findResource,
  findRelationLinks,
  findRelations,
  getResources,
} from "./get-resources"
import { Link, Resource } from "./types"

const resources: Resource[] = getResources()
const nonIndexResources = resources.filter(r => !r.isIndex)
const indexResources = resources.filter(r => r.isIndex)

function embedLinkedResources(
  resourcesToUpdate: Resource[],
  version: "source" | "target"
) {
  for (const resource of resourcesToUpdate) {
    resource.target.yaml = { ...resource.source.markdown.frontmatter }
    if (resource.source.markdown.content) {
      resource.target.yaml.content = resource.source.markdown.content.trim()
    }
    const relations = findRelations(resource)
    for (const relation of relations) {
      const links = findRelationLinks(resource, relation)
      let linkedResources

      if (Array.isArray(links)) {
        linkedResources = links
          .map((link: Link) => {
            const linkedResource = findResource(link, resources)
            return version === "source"
              ? { ...linkedResource[version].markdown.frontmatter }
              : { ...linkedResource[version].yaml }
          })
          .filter(Boolean)
      } else if (version === "target") {
        // Must be an "index" relation (e.g. /languages/), so embed __its__ embedded resource.
        const linkedResource = findResource(links, resources)
        linkedResources = {
          ...linkedResource[version].yaml._embedded[relation],
        }
      } else {
        throw `Embedding index relations using version: ${version} doesn't make sense.`
      }

      if (linkedResources) {
        if (!resource.target.yaml._embedded) {
          resource.target.yaml._embedded = {}
        }
        resource.target.yaml._embedded[relation] = linkedResources
      }
    }
    writeYAML(resource.target.path, resource.target.yaml)
  }
}

function sortEmbeddedResources(resources: Resource[]) {
  for (const resource of resources) {
    if (resource.target.yaml && resource.target.yaml._embedded) {
      resource.target.yaml = sortEmbedded(resource.target.yaml)
      writeYAML(resource.target.path, resource.target.yaml)
    }
  }
}

process.on("unhandledRejection", err => {
  console.error("There was an uncaught error", err)
  process.exit(1)
})

embedLinkedResources(nonIndexResources, "source")
embedLinkedResources(indexResources, "target")
sortEmbeddedResources(resources)
