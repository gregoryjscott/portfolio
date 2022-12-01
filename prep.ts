import * as fs from 'fs'
import * as YAML from 'yaml'
import * as path from 'path'

interface Project {
  url: string
  jobs?: Job[]
  db?: Skill[]
  languages?: Skill[]
  os?: Skill[]
  tools?: Skill[]
}

interface Job {
  url: string
  projects?: Project[]
  db?: Skill[]
  languages?: Skill[]
  os?: Skill[]
  tools?: Skill[]
}

interface School {
  url: string
}

interface Skill {
  url: string
  projects?: Project[]
  schools?: School[]
}

const projects: Project[] = []
const jobs: Job[] = buildJob('jobs')

const db: Skill[] = buildSkill('db')
const languages: Skill[] = buildSkill('languages')
const os: Skill[] = buildSkill('os')
const tools: Skill[] = buildSkill('tools')
updateData()

function updateData() {
  const projectFiles = fs.readdirSync('./_data/projects')
  for (const file of projectFiles) {
    const project = {
      url: `/projects/${path.parse(file).name}/`,
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
    data._links.self = {href: project.url}
    data._links.db = mapLinks(data._links.db)
    data._links.jobs = mapLinks(data._links.jobs)
    data._links.languages = mapLinks(data._links.languages)
    data._links.os = mapLinks(data._links.os)
    data._links.tools = mapLinks(data._links.tools)

    if (data._links.jobs) project.jobs = data._links.jobs.map(l => { return {url: l.href}})
    if (data._links.db) project.db = data._links.db.map(l => { return {url: l.href}})
    if (data._links.languages) project.languages = data._links.languages.map(l => { return {url: l.href}})
    if (data._links.os) project.os = data._links.os.map(l => { return {url: l.href}})
    if (data._links.tools) project.tools = data._links.tools.map(l => { return {url: l.href}})

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
    const school = { url: `/schools/${path.parse(file).name}/`}
    const filePath = `_data/schools/${file}`
    const contents = fs.readFileSync(filePath, 'utf8')
    const data = YAML.parse(contents)

    if (!data._links) data._links = {}
    data._links.self = {href: school.url}
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
      const project = projects.find(p => p.url === jobProject.url)
      for (const database of project.db) {
        dbURLs.add(database.url)
      }
      for (const language of project.languages) {
        languageURLs.add(language.url)
      }
      for (const os of project.os) {
        osURLs.add(os.url)
      }
      for (const tool of project.tools) {
        toolURLs.add(tool.url)
      }
    }
    job.db = Array.from(dbURLs).map(url => { return {url}})
    job.languages = Array.from(languageURLs).map(url => { return {url}})
    job.os = Array.from(osURLs).map(url => { return {url}})
    job.tools = Array.from(toolURLs).map(url => { return {url}})
  }

  writeSkill('db', db)
  writeJob('jobs', jobs)
  writeSkill('languages', languages)
  writeSkill('os', os)
  writeSkill('tools', tools)
}

function buildJob(urlFragment: string): Job[] {
  const files = fs.readdirSync(`./_data/${urlFragment}`)
  const urls = files.map(j => `/${urlFragment}/${path.parse(j).name}/`)
  const jobs: Job[] = []
  for (const url of urls) {
    jobs.push({url: url, projects: [], languages: []})
  }
  return jobs
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

function writeJob(urlFragment: string, jobs: Job[]) {
  for (const job of jobs) {
    const filePath = `_data/${urlFragment}/${path.parse(job.url).name}.yml`
    const contents = fs.readFileSync(filePath, 'utf8')
    const data = YAML.parse(contents)
    if (!data._links) data._links = {}
    const self = `/${urlFragment}/${path.parse(filePath).name}/`
    data._links.self = {href: self}
    if (job.projects.length > 0) {
      data._links.projects = job.projects.map(p => { return {href: p.url}})
    } else if (data._links.projects) {
      delete data._links.projects
    }
    if (job.db.length > 0) {
      data._links.db = job.db.map(p => { return {href: p.url}})
    } else if (data._links.db) {
      delete data._links.db
    }
    if (job.languages.length > 0) {
      data._links.languages = job.languages.map(p => { return {href: p.url}})
    } else if (data._links.languages) {
      delete data._links.languages
    }
    if (job.os.length > 0) {
      data._links.os = job.os.map(p => { return {href: p.url}})
    } else if (data._links.os) {
      delete data._links.os
    }
    if (job.tools.length > 0) {
      data._links.tools = job.tools.map(p => { return {href: p.url}})
    } else if (data._links.tools) {
      delete data._links.tools
    }
    fs.writeFileSync(filePath, YAML.stringify(data))
    console.log(`Wrote ${filePath}`)
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
    fs.writeFileSync(filePath, YAML.stringify(data))
    console.log(`Wrote ${filePath}`)
  }
}
