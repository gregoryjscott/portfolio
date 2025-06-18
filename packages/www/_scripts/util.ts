import * as fs from "fs"
import * as path from "path"
import * as YAML from "yaml"
import * as matter from "gray-matter"
import * as prettier from "prettier"

export function writeMarkdown(
  path: {
    directory: string
    name: string
  },
  content: string,
  json: any
) {
  const fullPath = `${path.directory}/${path.name}.md`
  console.log(`Writing ${fullPath}`)
  const prettyMarkdown = prettier.format(content, {
    parser: "markdown",
  })
  const text = `${matter.stringify(prettyMarkdown, cleanJSON(json)).trim()}\n`
  const prettyText = prettier.format(text, {
    parser: "markdown",
  })
  fs.writeFileSync(fullPath, prettyText)
}


export function writeYAML(
  path: {
    directory: string
    name: string
  },
  json: any
) {
  const fullPath = `${path.directory}/${path.name}.yml`
  console.log(`Writing ${fullPath}`)
  const text = YAML.stringify(cleanJSON(json)).trim()
  fs.writeFileSync(fullPath, text)
}


function cleanJSON(json: any) {
  const jsonText = JSON.stringify(json)
  return JSON.parse(jsonText)
}
