import * as fs from 'fs'
import * as YAML from 'yaml'
import * as path from 'path'

interface Project {
  url: string
  languages?: Language[]
}

interface Language {
  url: string
  projects?: Project[]
}

// parse _data/projects
// Generate the `_links` inside of ./_data/x/*.yml, where x = db, jobs, languages, os, tools using ./_data/projects and ./data/schools

// const dataFiles = fs.readdirSync('./_data')
// console.log(dataFiles)

// const jobFiles = fs.readdirSync('./_data/jobs')
// const jobURLs = jobFiles.map(j => `/jobs/${path.parse(j).name}`)
// console.log(jobURLs)

// const contents = fs.readFileSync('./_data/projects/epicloud.yml', 'utf8')
// const data = YAML.parse(contents)
// console.log(JSON.stringify(data, null, 2))
// console.log(data._links.job[0])


const languageFiles = fs.readdirSync('./_data/languages')
const languageURLs = languageFiles.map(j => `/languages/${path.parse(j).name}/`)
const languages: Language[] = []
for (const languageURL of languageURLs) {
  languages.push({url: languageURL, projects: []})
}
console.log(languages)

const projectFiles = fs.readdirSync('./_data/projects')
for (const projectFile of projectFiles) {
  const url = `/projects/${path.parse(projectFile).name}/`
  const contents = fs.readFileSync(`./_data/projects/${projectFile}`, 'utf8')
  const data = YAML.parse(contents)
//   console.log(url)
//   console.log(data._links.languages)

  for (const projectLanguage of data._links.languages) {
    const language = languages.find(l => l.url === projectLanguage.href)
    if (!language) throw `${projectLanguage.href} is missing`
    language.projects.push({url})
  }
}

for (const language of languages) {
  if (language.projects.length < 1) continue
  const languageFilePath = `_data/languages/${path.parse(language.url).name}.yml`
  console.log(languageFilePath)
  const contents = fs.readFileSync(languageFilePath, 'utf8')
  const data = YAML.parse(contents)
  data._links.projects = language.projects.map(p => { return {href: p.url}})
  fs.writeFileSync(languageFilePath, YAML.stringify(data))
}

// console.log(JSON.stringify(languages, null, 2))



// ******************
// looks like jekyll-embed needs to add a _links.self to embedded so that embedded can be passed around and still contain the href
// OR, just do it in this script..........
// ******************


// go through the projects
// for each project
//   find the list of languages
//   for each language
//     add the project