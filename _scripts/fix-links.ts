import * as matter from "gray-matter"
import { sortBy, uniqBy } from "lodash"
import { writeMarkdown } from "./util"
import {
  findResource,
  findRelationLinks,
  findRelations,
  getResources,
  resourceDirectories,
} from "./get-resources"
import { Resource } from "./types"

const resources: Resource[] = getResources()
const nonIndexResources = resources.filter(r => !r.isIndex)
const projects = nonIndexResources.filter(r => r.relation === "projects")
const schools = nonIndexResources.filter(r => r.relation === "schools")
const dependentResources = nonIndexResources.filter(
  r => r.relation !== "projects" && r.relation !== "schools"
)
const jobs = dependentResources.filter(r => r.relation === "jobs")

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

    resource.source.markdown.frontmatter._links.self = { href: resource.href }
    writeMarkdown(
      resource.source.path,
      resource.source.markdown.content,
      resource.source.markdown.frontmatter
    )
  }
}

function fixBackLinks() {
  for (const dependentResource of dependentResources) {
    dependentResource.source.markdown.frontmatter._links = {
      self: dependentResource.source.markdown.frontmatter._links.self,
    }
  }

  for (const project of projects) {
    const projectRelations = findRelations(project)
    for (const projectRelation of projectRelations) {
      const projectRelationLinks = [].concat(
        findRelationLinks(project, projectRelation)
      )
      for (const projectRelationLink of projectRelationLinks) {
        const linkedResource = findResource(
          projectRelationLink,
          dependentResources
        )
        const linkedResourceProjectLinks = [].concat(
          findRelationLinks(linkedResource, "projects")
        )
        linkedResource.source.markdown.frontmatter._links["projects"] = sortBy(
          [...linkedResourceProjectLinks, { href: project.href }],
          l => l.href
        )

        if (projectRelation !== "jobs") {
          const projectJobLinks = [].concat(findRelationLinks(project, "jobs"))
          const linkedResourceJobLinks = [].concat(
            findRelationLinks(linkedResource, "jobs")
          )
          linkedResource.source.markdown.frontmatter._links["jobs"] = sortBy(
            uniqBy(
              [...linkedResourceJobLinks, ...projectJobLinks],
              l => l.href
            ),
            l => l.href
          )
        }
      }
    }
  }

  for (const school of schools) {
    const schoolRelations = findRelations(school)
    for (const schoolRelation of schoolRelations) {
      const schoolRelationLinks = [].concat(
        findRelationLinks(school, schoolRelation)
      )
      for (const schoolRelationLink of schoolRelationLinks) {
        const linkedResource = findResource(
          schoolRelationLink,
          dependentResources
        )
        const linkedResourceSchoolLinks = [].concat(
          findRelationLinks(linkedResource, "schools")
        )
        linkedResource.source.markdown.frontmatter._links["schools"] = sortBy(
          [...linkedResourceSchoolLinks, { href: school.href }],
          l => l.href
        )
      }
    }
  }

  for (const job of jobs) {
    const projectLinks = [].concat(findRelationLinks(job, "projects"))
    for (const projectLink of projectLinks) {
      const project = findResource(projectLink, projects)
      const projectRelations = findRelations(project).filter(
        pr => pr !== "jobs"
      )
      for (const relation of projectRelations) {
        const projectRelationLinks = [].concat(
          findRelationLinks(project, relation)
        )
        const jobRelationLinks = [].concat(findRelationLinks(job, relation))
        job.source.markdown.frontmatter._links[relation] = sortBy(
          uniqBy([...jobRelationLinks, ...projectRelationLinks], l => l.href),
          l => l.href
        )
      }
    }
  }

  for (const resource of nonIndexResources) {
    sortRelations(resource)
    writeMarkdown(
      resource.source.path,
      resource.source.markdown.content,
      resource.source.markdown.frontmatter
    )
  }
}

function fixIndexLinks() {
  for (const directory of resourceDirectories) {
    const directoryResources = nonIndexResources.filter(
      r => r.relation === directory
    )
    if (directoryResources.length === 0) continue
    const filePath = `${directory}/index.md`
    const { content, data } = matter.read(filePath)
    data._links[directory] = directoryResources.map(
      r => r.source.markdown.frontmatter._links.self
    )
    writeMarkdown({ directory, name: "index" }, content, data)
  }
}

function sortRelations(resource: Resource) {
  const order = ["self", "code", ...resourceDirectories]
  resource.source.markdown.frontmatter._links = {
    ...Object.fromEntries(
      Object.entries(resource.source.markdown.frontmatter._links).sort(
        ([keyA], [keyB]) => {
          const indexA = order.indexOf(keyA)
          const indexB = order.indexOf(keyB)

          if (indexA > -1 && indexB > -1) return indexA - indexB
          if (indexA > -1) return -1
          if (indexB > -1) return 1
          return keyA.localeCompare(keyB)
        }
      )
    ),
  }

  // Relation links on dependent resources are overwritten (and therefore sorted), so
  // we only need to sort the relation links on non-dependent resources.
  if (!dependentResources.includes(resource)) {
    const resourceRelations = findRelations(resource).filter(
      pr => pr !== "self"
    )
    for (const relation of resourceRelations) {
      const projectRelationLinks = [].concat(
        findRelationLinks(resource, relation)
      )
      const jobRelationLinks = [].concat(findRelationLinks(resource, relation))
      resource.source.markdown.frontmatter._links[relation] = sortBy(
        uniqBy([...jobRelationLinks, ...projectRelationLinks], l => l.href),
        l => l.href
      )
    }
  }
}

process.on("unhandledRejection", err => {
  console.error("There was an uncaught error", err)
  process.exit(1)
})

fixSelfLinks()
fixBackLinks()
fixIndexLinks()
