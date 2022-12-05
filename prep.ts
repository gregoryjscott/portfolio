import * as fs from 'fs'
import * as YAML from 'yaml'
import * as path from 'path'

interface Project {
  href: string
  jobs?: Job[]
  db?: Skill[]
  languages?: Skill[]
  os?: Skill[]
  tools?: Skill[]
}

interface Job {
  href: string
  projects?: Project[]
  db?: Skill[]
  languages?: Skill[]
  os?: Skill[]
  tools?: Skill[]
}

interface School {
  href: string
}

interface Skill {
  href: string
  projects?: Project[]
  schools?: School[]
}

const projects: Project[] = []
const jobs: Job[] = buildJob('jobs')

const db: Skill[] = buildSkill('db')
const languages: Skill[] = buildSkill('languages')
const os: Skill[] = buildSkill('os')
const tools: Skill[] = buildSkill('tools')

// Remove this and the linked data becomes embedded in _links, potentially
// eliminating the need for `jekyll-embed`. But, that would clutter the source
// data set that is partially maintained manually. Currently, embedding everything
// at runtime keeps it simply hrefs everywhere.s
const mapHrefOnly = resource => { return {href: resource.href}}

updateData()

function updateData() {
  const projectFiles = fs.readdirSync('./_data/projects')
  for (const file of projectFiles) {
    const project = {
      href: `/projects/${path.parse(file).name}/`,
      jobs: [],
      db: [],
      languages: [],
      os: [],
      tools: []
    }
    projects.push(project)
    const filePath = `_data/projects/${file}`
    const contents = fs.readFileSync(filePath, 'utf8')
    const data = YAML.parse(contents)

    if (!data._links) data._links = {}
    data._links.self = {href: project.href}
    data._links.db = mapLinks(data._links.db)
    data._links.jobs = mapLinks(data._links.jobs)
    data._links.languages = mapLinks(data._links.languages)
    data._links.os = mapLinks(data._links.os)
    data._links.tools = mapLinks(data._links.tools)

    if (data._links.jobs) project.jobs = data._links.jobs.map(l => { return {href: l.href}})
    if (data._links.db) project.db = data._links.db.map(l => { return {href: l.href}})
    if (data._links.languages) project.languages = data._links.languages.map(l => { return {href: l.href}})
    if (data._links.os) project.os = data._links.os.map(l => { return {href: l.href}})
    if (data._links.tools) project.tools = data._links.tools.map(l => { return {href: l.href}})

    fs.writeFileSync(filePath, YAML.stringify(data))
    console.log(`Wrote ${filePath}`)

    updateProjectLinkedSkill(jobs, project, data._links.jobs)
    updateProjectLinkedSkill(db, project, data._links.db)
    updateProjectLinkedSkill(languages, project, data._links.languages)
    updateProjectLinkedSkill(os, project, data._links.os)
    updateProjectLinkedSkill(tools, project, data._links.tools)
  }

  const schoolFiles = fs.readdirSync('./_data/schools')
  for (const file of schoolFiles) {
    const school = { href: `/schools/${path.parse(file).name}/`}
    const filePath = `_data/schools/${file}`
    const contents = fs.readFileSync(filePath, 'utf8')
    const data = YAML.parse(contents)

    if (!data._links) data._links = {}
    data._links.self = {href: school.href}
    data._links.db = mapLinks(data._links.db)
    data._links.languages = mapLinks(data._links.languages)
    data._links.os = mapLinks(data._links.os)
    data._links.tools = mapLinks(data._links.tools)
    fs.writeFileSync(filePath, YAML.stringify(data))
    console.log(`Wrote ${filePath}`)

    updateSchoolLinkedSkill(db, school, data._links.db)
    updateSchoolLinkedSkill(languages, school, data._links.languages)
    updateSchoolLinkedSkill(os, school, data._links.os)
    updateSchoolLinkedSkill(tools, school, data._links.tools)
  }

  for (const job of jobs) {
    const dbURLs = new Set<string>()
    const languageURLs = new Set<string>()
    const osURLs = new Set<string>()
    const toolURLs = new Set<string>()
    for (const jobProject of job.projects) {
      const project = projects.find(p => p.href === jobProject.href)
      for (const database of project.db) {
        dbURLs.add(database.href)
      }
      for (const language of project.languages) {
        languageURLs.add(language.href)
      }
      for (const os of project.os) {
        osURLs.add(os.href)
      }
      for (const tool of project.tools) {
        toolURLs.add(tool.href)
      }
    }
    job.db = Array.from(dbURLs).map(href => { return {href}})
    job.languages = Array.from(languageURLs).map(href => { return {href}})
    job.os = Array.from(osURLs).map(href => { return {href}})
    job.tools = Array.from(toolURLs).map(href => { return {href}})
  }

  writeSkill('db', db)
  writeJob('jobs', jobs)
  writeSkill('languages', languages)
  writeSkill('os', os)
  writeSkill('tools', tools)
}

function buildJob(hrefFragment: string): Job[] {
  const files = fs.readdirSync(`./_data/${hrefFragment}`)
  const hrefs = files.map(j => `/${hrefFragment}/${path.parse(j).name}/`)
  const jobs: Job[] = []
  for (const href of hrefs) {
    jobs.push({href: href, projects: [], languages: []})
  }
  return jobs
}

function buildSkill(hrefFragment: string): Skill[] {
  const files = fs.readdirSync(`./_data/${hrefFragment}`)
  const hrefs = files.map(j => `/${hrefFragment}/${path.parse(j).name}/`)
  const skills: Skill[] = []
  for (const href of hrefs) {
    skills.push({href: href, projects: [], schools: []})
  }
  return skills
}

function mapLinks(skillLinks: any[]) {
  if (skillLinks) return skillLinks.map(s => { return {href: s.href}})
}

function updateProjectLinkedSkill(skills: Skill[], project: Project, links: any[]) {
  if (links) {
    for (const link of links) {
      const skill = skills.find(s => s.href === link.href)
      if (!skill) throw `${link.href} is missing`
      skill.projects.push(project)
    }
  }
}

function updateSchoolLinkedSkill(skills: Skill[], school: School, links: any[]) {
  if (links) {
    for (const link of links) {
      const skill = skills.find(s => s.href === link.href)
      if (!skill) throw `${link.href} is missing`
      skill.schools.push(school)
    }
  }
}

function writeJob(hrefFragment: string, jobs: Job[]) {
  for (const job of jobs) {
    const filePath = `_data/${hrefFragment}/${path.parse(job.href).name}.yml`
    const contents = fs.readFileSync(filePath, 'utf8')
    const data = YAML.parse(contents)
    if (!data._links) data._links = {}
    const self = `/${hrefFragment}/${path.parse(filePath).name}/`
    data._links.self = {href: self}
    if (job.projects.length > 0) {
      data._links.projects = job.projects.map(mapHrefOnly)
    } else if (data._links.projects) {
      delete data._links.projects
    }
    if (job.db.length > 0) {
      data._links.db = job.db.map(mapHrefOnly)
    } else if (data._links.db) {
      delete data._links.db
    }
    if (job.languages.length > 0) {
      data._links.languages = job.languages.map(mapHrefOnly)
    } else if (data._links.languages) {
      delete data._links.languages
    }
    if (job.os.length > 0) {
      data._links.os = job.os.map(mapHrefOnly)
    } else if (data._links.os) {
      delete data._links.os
    }
    if (job.tools.length > 0) {
      data._links.tools = job.tools.map(mapHrefOnly)
    } else if (data._links.tools) {
      delete data._links.tools
    }
    fs.writeFileSync(filePath, YAML.stringify(data))
    console.log(`Wrote ${filePath}`)
  }
}

function writeSkill(hrefFragment: string, skills: Skill[]) {
  for (const skill of skills) {
    const filePath = `_data/${hrefFragment}/${path.parse(skill.href).name}.yml`
    const contents = fs.readFileSync(filePath, 'utf8')
    const data = YAML.parse(contents)
    if (!data._links) data._links = {}
    const self = `/${hrefFragment}/${path.parse(filePath).name}/`
    data._links.self = {href: self}
    if (skill.projects.length > 0) {
      data._links.projects = skill.projects.map(mapHrefOnly)
    } else if (data._links.projects) {
      delete data._links.projects
    }
    if (skill.schools.length > 0) {
      data._links.schools = skill.schools.map(mapHrefOnly)
    } else if (data._links.schools) {
      delete data._links.schools
    }
    fs.writeFileSync(filePath, YAML.stringify(data))
    console.log(`Wrote ${filePath}`)
  }
}

