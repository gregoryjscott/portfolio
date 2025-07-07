import resources from "../_data/resources.json"

export type Resource = {
  relation: Relation
  relationTitle: string
  resourceTitle: string
  href: string
  isIndex: boolean
  isSkill: boolean
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

export type Relation = "self" | keyof typeof resources

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
