import * as fs from "fs"
import * as path from "path"
import * as matter from "gray-matter"
import * as prettier from "prettier"

export const dataDirectory = "_data"

export interface Resource {
  name: string
  href: string
  isIndex: boolean
  path: {
    directory: string
    name: string
  }
  source: {
    content: string
    data: any
  }
  target: {
    content: string
    data: any
  }
}

export function prepareResources(directories: string[]): Resource[] {
  if (!fs.existsSync(dataDirectory)) fs.mkdirSync(dataDirectory)
  const resources: Resource[] = []
  for (const directory of directories) {
    const files = fs.readdirSync(directory)
    for (const file of files) {
      const parsedPath = path.parse(file)
      if (file === "index.ts") continue
      const isIndex = parsedPath.name === "index"
      const sourceFilePath = `${directory}/${parsedPath.name}.md`
      const { content, data } = matter.read(sourceFilePath)

      resources.push({
        name: directory,
        href: isIndex ? `/${directory}/` : `/${directory}/${parsedPath.name}/`,
        isIndex,
        path: {
          directory,
          name: parsedPath.name,
        },
        source: {
          content,
          data,
        },
        target: {
          content,
          data: undefined,
        },
      })
    }
    if (!fs.existsSync(`${dataDirectory}/${directory}`)) {
      fs.mkdirSync(`${dataDirectory}/${directory}`)
    }
  }
  return resources
}

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

function cleanJSON(json: any) {
  const jsonText = JSON.stringify(json)
  return JSON.parse(jsonText)
}
