import { writeYAML } from "./util"
import { sortEmbedded } from "./sort-embedded"
import {
  Resource,
  findResource,
  findRelationLinks,
  findRelations,
  getResources,
  Link,
} from "./get-resources"

const resources: Resource[] = getResources()
const nonIndexResources = resources.filter(r => !r.isIndex)
const indexResources = resources.filter(r => r.isIndex)

function embedLinkedResources(
  resourcesToUpdate: Resource[],
  version: "sourceMarkdown" | "targetYaml"
) {
  for (const resource of resourcesToUpdate) {
    resource.targetYaml.data = { ...resource.sourceMarkdown.data }
    if (resource.sourceMarkdown.content) {
      resource.targetYaml.data.content = resource.sourceMarkdown.content.trim()
    }
    const relations = findRelations(resource)
    for (const relation of relations) {
      const links = findRelationLinks(resource, relation)
      let linkedResources

      if (Array.isArray(links)) {
        linkedResources = links
          .map((link: Link) => {
            const linkedResource = findResource(link, resources)
            return { ...linkedResource[version].data }
          })
          .filter(Boolean)
      } else {
        // Must be an "index" relation (e.g. /languages/), so embed __its__ embedded resource.
        const linkedResource = findResource(links, resources)
        linkedResources = {
          ...linkedResource[version].data._embedded[relation],
        }
      }

      if (linkedResources) {
        if (!resource.targetYaml.data._embedded) {
          resource.targetYaml.data._embedded = {}
        }
        resource.targetYaml.data._embedded[relation] = linkedResources
      }
    }
    writeYAML(resource.targetYaml.path, resource.targetYaml.data)
  }
}

function sortEmbeddedResources(resources: Resource[]) {
  for (const resource of resources) {
    if (resource.targetYaml.data && resource.targetYaml.data._embedded) {
      resource.targetYaml.data = sortEmbedded(resource.targetYaml.data)
      writeYAML(resource.targetYaml.path, resource.targetYaml.data)
    }
  }
}

process.on("unhandledRejection", err => {
  console.error("There was an uncaught error", err)
  process.exit(1)
})

embedLinkedResources(nonIndexResources, "sourceMarkdown")
embedLinkedResources(indexResources, "targetYaml")
sortEmbeddedResources(resources)
