import { writeYAML } from "./util"
import { sortEmbedded } from "./sort-embedded"
import {
  Resource,
  findResource,
  findRelationLinks,
  findRelations,
  getResources,
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
    const relations = findRelations(resource)
    for (const relation of relations) {
      const links = findRelationLinks(resource, relation)
      const linkedResources = links.map(link => {
        const linkedResource = findResource(link, resources)
        return { ...linkedResource[version].data }
      })
      if (!resource.targetYaml.data._embedded)
        resource.targetYaml.data._embedded = {}
      resource.targetYaml.data._embedded[relation] = linkedResources
    }
    writeYAML(resource.targetYaml.path, resource.targetYaml.data)
  }
}

function sortEmbeddedResources(resources: Resource[]) {
  for (const resource of resources) {
    resource.targetYaml.data = sortEmbedded(resource.targetYaml.data)
    writeYAML(resource.targetYaml.path, resource.targetYaml.data)
  }
}

process.on("unhandledRejection", err => {
  console.error("There was an uncaught error", err)
  process.exit(1)
})

embedLinkedResources(nonIndexResources, "sourceMarkdown")
embedLinkedResources(indexResources, "targetYaml")
sortEmbeddedResources(resources)
