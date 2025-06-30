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
    resource.targetYaml.yaml = { ...resource.sourceMarkdown.frontmatter }
    if (resource.sourceMarkdown.content) {
      resource.targetYaml.yaml.content = resource.sourceMarkdown.content.trim()
    }
    const relations = findRelations(resource)
    for (const relation of relations) {
      const links = findRelationLinks(resource, relation)
      let linkedResources

      if (Array.isArray(links)) {
        linkedResources = links
          .map((link: Link) => {
            const linkedResource = findResource(link, resources)
            return version === "sourceMarkdown"
              ? { ...linkedResource[version].frontmatter }
              : { ...linkedResource[version].yaml }
          })
          .filter(Boolean)
      } else if (version === "targetYaml") {
        // Must be an "index" relation (e.g. /languages/), so embed __its__ embedded resource.
        const linkedResource = findResource(links, resources)
        linkedResources = {
          ...linkedResource[version].yaml._embedded[relation],
        }
        // TODO - is the version = "sourceMarkdown" really needed?
        // linkedResources =
        //   version === "sourceMarkdown"
        //     ? { ...linkedResource[version].frontmatter }
        //     : { ...linkedResource[version].yaml }
      }

      if (linkedResources) {
        if (!resource.targetYaml.yaml._embedded) {
          resource.targetYaml.yaml._embedded = {}
        }
        resource.targetYaml.yaml._embedded[relation] = linkedResources
      }
    }
    writeYAML(resource.targetYaml.path, resource.targetYaml.yaml)
  }
}

function sortEmbeddedResources(resources: Resource[]) {
  for (const resource of resources) {
    if (resource.targetYaml.yaml && resource.targetYaml.yaml._embedded) {
      resource.targetYaml.yaml = sortEmbedded(resource.targetYaml.yaml)
      writeYAML(resource.targetYaml.path, resource.targetYaml.yaml)
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
