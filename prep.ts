import * as fs from 'fs'
import * as YAML from 'yaml'
import * as path from 'path'

interface Project {
  url: string
}

interface School {
  url: string
}

interface Skill {
  url: string
  projects?: Project[]
  schools?: School[]
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
    data._links.db = mapLinks(data._links.db)
    data._links.jobs = mapLinks(data._links.jobs)
    data._links.languages = mapLinks(data._links.languages)
    data._links.os = mapLinks(data._links.os)
    data._links.tools = mapLinks(data._links.tools)
    fs.writeFileSync(projectFilePath, YAML.stringify(data))

    updateProjectLinkedSkill(db, {url: projectURL}, data._links.db)
    updateProjectLinkedSkill(jobs, {url: projectURL}, data._links.jobs)
    updateProjectLinkedSkill(languages, {url: projectURL}, data._links.languages)
    updateProjectLinkedSkill(os, {url: projectURL}, data._links.os)
    updateProjectLinkedSkill(tools, {url: projectURL}, data._links.tools)
  }

  const schoolFiles = fs.readdirSync('./_data/schools')
  for (const schoolFile of schoolFiles) {
    const schoolURL = `/schools/${path.parse(schoolFile).name}/`
    const schoolFilePath = `./_data/schools/${schoolFile}`
    const contents = fs.readFileSync(schoolFilePath, 'utf8')
    const data = YAML.parse(contents)

    if (!data._links) data._links = {}
    data._links.self = {href: schoolURL}
    data._links.db = mapLinks(data._links.db)
    data._links.languages = mapLinks(data._links.languages)
    data._links.os = mapLinks(data._links.os)
    data._links.tools = mapLinks(data._links.tools)
    fs.writeFileSync(schoolFilePath, YAML.stringify(data))

    updateSchoolLinkedSkill(db, {url: schoolURL}, data._links.db)
    updateSchoolLinkedSkill(jobs, {url: schoolURL}, data._links.jobs)
    updateSchoolLinkedSkill(languages, {url: schoolURL}, data._links.languages)
    updateSchoolLinkedSkill(os, {url: schoolURL}, data._links.os)
    updateSchoolLinkedSkill(tools, {url: schoolURL}, data._links.tools)
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
    skills.push({url: url, projects: [], schools: []})
  }
  return skills
}

function mapLinks(skillLinks: any[]) {
  if (skillLinks) return skillLinks.map(s => { return {href: s.href}})
}

function updateProjectLinkedSkill(skills: Skill[], project: Project, links: any[]) {
  if (links) {
    for (const link of links) {
      const skill = skills.find(s => s.url === link.href)
      if (!skill) throw `${link.href} is missing`
      skill.projects.push(project)
    }
  }
}

function updateSchoolLinkedSkill(skills: Skill[], school: School, links: any[]) {
  if (links) {
    for (const link of links) {
      const skill = skills.find(s => s.url === link.href)
      if (!skill) throw `${link.href} is missing`
      skill.schools.push(school)
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
    if (skill.schools.length > 0) {
      data._links.schools = skill.schools.map(p => { return {href: p.url}})
    } else if (data._links.schools) {
      delete data._links.schools
    }
    console.log(filePath)
    fs.writeFileSync(filePath, YAML.stringify(data))
  }
}
