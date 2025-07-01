import { writeMarkdown } from "./util"
import {
  Resource,
  findResource,
  findRelationLinks,
  getResources,
} from "./get-resources"

const resources: Resource[] = getResources()
const nonIndexResources = resources.filter(r => !r.isIndex)
const projects = nonIndexResources.filter(r => r.name === "projects")
const schools = nonIndexResources.filter(r => r.name === "schools")
const targetResources = nonIndexResources.filter(
  r => r.name !== "projects" && r.name !== "schools"
)
const skills = targetResources.filter(r => r.name !== "jobs")

function setYearRange() {
  for (const skill of skills) {
    let minYear = 9999
    let maxYear = 0

    const projectLinks = [].concat(findRelationLinks(skill, "projects"))
    for (const projectLink of projectLinks) {
      const project = findResource(projectLink, projects)
      const beginYear = project.sourceMarkdown.data.begin_year
      const endYear =
        project.sourceMarkdown.data.end_year === "present"
          ? 9999
          : project.sourceMarkdown.data.end_year || 9999
      if (beginYear && beginYear < minYear) {
        minYear = beginYear
      }
      if (endYear && endYear > maxYear) {
        maxYear = endYear
      }
    }

    const schoolLinks = [].concat(findRelationLinks(skill, "schools"))
    for (const schoolLink of schoolLinks) {
      const school = findResource(schoolLink, schools)
      const beginYear = school.sourceMarkdown.data.begin_year
      const endYear =
        school.sourceMarkdown.data.end_year === "present"
          ? 9999
          : school.sourceMarkdown.data.end_year || 9999
      if (beginYear && beginYear < minYear) {
        minYear = beginYear
      }
      if (endYear && endYear > maxYear) {
        maxYear = endYear
      }
    }

    if (minYear === 9999 && maxYear === 0) {
      throw `${skill.href} has no projects or schools`
    }

    const { _links, ...rest } = skill.sourceMarkdown.data
    const data = {
      ...rest,
      begin_year: minYear,
      end_year: maxYear === 9999 ? "present" : maxYear,
      _links,
    }

    writeMarkdown(skill.sourceMarkdown.path, skill.sourceMarkdown.content, data)
  }
}

process.on("unhandledRejection", err => {
  console.error("There was an uncaught error", err)
  process.exit(1)
})

setYearRange()
