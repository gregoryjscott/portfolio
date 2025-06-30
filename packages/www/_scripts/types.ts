import { resourceDirectories } from "./get-resources"

export type Relation = typeof resourceDirectories[number] | "self"

export type Link = { href: string }

export type Links = {
  [key in Relation]?: Link | Link[]
}

export type Frontmatter = {
  [key: string]: any
  _links?: Links
}

export type Embedded = {
  [key in Relation]?: Yaml[]
}

export type Yaml = {
  [key: string]: any
  _links?: Links
  _embedded?: Embedded
  content?: string
}

export type Resource = {
  relation: Relation
  href: string
  isIndex: boolean
  prompt: string | null
  sourceMarkdown: {
    path: {
      directory: string
      name: string
    }
    content: string
    frontmatter: Frontmatter
  }
  targetYaml: {
    path: {
      directory: string
      name: string
    }
    yaml: Yaml | undefined
  }
}

export type Sortable = Yaml & {
  begin_year?: number
  end_year?: number | "present"
}
