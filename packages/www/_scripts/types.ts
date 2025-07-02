import resources from "../_data/resources.json"

export type Resource = {
  relation: Relation
  href: string
  isIndex: boolean
  prompt: string | null
  source: {
    path: {
      directory: string
      name: string
    }
    markdown: Markdown
  }
  target: {
    path: {
      directory: string
      name: string
    }
    yaml: Yaml | undefined
  }
}

export type Relation = keyof typeof resources | "self"

export type Link = { href: string }

export type Links = {
  [key in Relation]?: Link | Link[]
}

export type Embedded = {
  [key in Relation]?: Yaml[]
}

export type Markdown = {
  frontmatter: Frontmatter
  content: string
}

export type Frontmatter = {
  [key: string]: any
  _links?: Links
}

export type Yaml = {
  [key: string]: any
  _links?: Links
  _embedded?: Embedded
  content?: string
}

export type Sortable = Yaml & {
  begin_year?: number
  end_year?: number | "present"
}
