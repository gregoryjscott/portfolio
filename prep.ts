// TODO
// - [ ] Fix code links (links-commans.html it is expecting _embedded style)
// - [ ] Fix school links (links-commans.html it is expecting _embedded style)

import * as fs from 'fs'
import * as YAML from 'yaml'
import * as path from 'path'

interface Project {
  url: string
  languages?: Skill[]
}

interface Skill {
  url: string
  projects?: Project[]
}

const db: Skill[] = buildSkill('db')
const jobs: Skill[] = buildSkill('jobs')
const languages: Skill[] = buildSkill('languages')
const os: Skill[] = buildSkill('os')
const tools: Skill[] = buildSkill('tools')
updateData()

function updateData() {
  const projectFiles = fs.readdirSync('./_data/projects')
  for (const projectFile of projectFiles) {
    const projectURL = `/projects/${path.parse(projectFile).name}/`
    const projectFilePath = `./_data/projects/${projectFile}`
    const contents = fs.readFileSync(projectFilePath, 'utf8')
    const data = YAML.parse(contents)

    if (!data._links) data._links = {}
    data._links.self = {href: projectURL}
    console.log(projectFilePath)
    fs.writeFileSync(projectFilePath, YAML.stringify(data))

    updateLinkedSkill(db, projectURL, data._links.db)
    updateLinkedSkill(jobs, projectURL, data._links.jobs)
    updateLinkedSkill(languages, projectURL, data._links.languages)
    updateLinkedSkill(os, projectURL, data._links.os)
    updateLinkedSkill(tools, projectURL, data._links.tools)
  }
  writeSkill('db', db)
  writeSkill('jobs', jobs)
  writeSkill('languages', languages)
  writeSkill('os', os)
  writeSkill('tools', tools)
}

function buildSkill(urlFragment: string): Skill[] {
  const files = fs.readdirSync(`./_data/${urlFragment}`)
  const urls = files.map(j => `/${urlFragment}/${path.parse(j).name}/`)
  const skills: Skill[] = []
  for (const url of urls) {
    skills.push({url: url, projects: []})
  }
  return skills
}

function updateLinkedSkill(skills: Skill[], projectURL: string, links: any[]) {
  if (links) {
    for (const link of links) {
      const skill = skills.find(s => s.url === link.href)
      if (!skill) throw `${link.href} is missing`
      skill.projects.push({url: projectURL})
    }
  }
}

function writeSkill(urlFragment: string, skills: Skill[]) {
  for (const skill of skills) {
    const filePath = `_data/${urlFragment}/${path.parse(skill.url).name}.yml`
    const contents = fs.readFileSync(filePath, 'utf8')
    const data = YAML.parse(contents)
    if (!data._links) data._links = {}
    const self = `/${urlFragment}/${path.parse(filePath).name}/`
    data._links.self = {href: self}
    if (skill.projects.length > 0) {
      data._links.projects = skill.projects.map(p => { return {href: p.url}})
    } else if (data._links.projects) {
      delete data._links.projects
    }
    console.log(filePath)
    fs.writeFileSync(filePath, YAML.stringify(data))
  }
}
