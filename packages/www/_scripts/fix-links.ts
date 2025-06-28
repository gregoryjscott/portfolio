import * as matter from "gray-matter"
import { sortBy, uniqBy } from "lodash"
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
const projects = nonIndexResources.filter(r => r.relation === "projects")
const schools = nonIndexResources.filter(r => r.relation === "schools")
const targetResources = nonIndexResources.filter(
  r => r.relation !== "projects" && r.relation !== "schools"
)
const jobs = targetResources.filter(r => r.relation === "jobs")

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
  for (const targetResource of targetResources) {
    targetResource.sourceMarkdown.data._links = {
      self: targetResource.sourceMarkdown.data._links.self,
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
          targetResources
        )
        const linkedResourceProjectLinks = [].concat(
          findRelationLinks(linkedResource, project.relation)
        )
        linkedResource.sourceMarkdown.data._links[project.relation] = sortBy(
          [...linkedResourceProjectLinks, { href: project.href }],
          l => l.href
        )

        if (projectRelation !== "jobs") {
          const projectJobLinks = [].concat(findRelationLinks(project, "jobs"))
          const linkedResourceJobLinks = [].concat(
            findRelationLinks(linkedResource, "jobs")
          )
          linkedResource.sourceMarkdown.data._links["jobs"] = sortBy(
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
        const linkedResource = findResource(schoolRelationLink, targetResources)
        const linkedResourceSchoolLinks = [].concat(
          findRelationLinks(linkedResource, school.relation)
        )
        linkedResource.sourceMarkdown.data._links[school.relation] = sortBy(
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
        pr => pr !== "jobs" // TODO - aka skills
      )
      for (const relation of projectRelations) {
        const projectRelationLinks = [].concat(
          findRelationLinks(project, relation)
        )
        const jobRelationLinks = [].concat(findRelationLinks(job, relation))
        job.sourceMarkdown.data._links[relation] = sortBy(
          uniqBy([...jobRelationLinks, ...projectRelationLinks], l => l.href),
          l => l.href
        )
      }
    }
  }

  for (const resource of nonIndexResources) {
    sortRelations(resource)
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
      r => r.relation === directory
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

function sortRelations(resource: Resource) {
  const order = ["self", "code", ...resourceDirectories]
  resource.sourceMarkdown.data._links = {
    ...Object.fromEntries(
      Object.entries(resource.sourceMarkdown.data._links).sort(
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
}

process.on("unhandledRejection", err => {
  console.error("There was an uncaught error", err)
  process.exit(1)
})

fixSelfLinks()
fixNonIndexLinks()
fixIndexLinks()
