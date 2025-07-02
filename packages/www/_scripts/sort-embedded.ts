import { reverse, sortBy } from "lodash"
import { Relation, Sortable, Yaml } from "./types"

export function sortEmbedded<T extends Yaml>(data: T): T {
  if (!data._embedded) {
    return data
  }

  const relations = Object.keys(data._embedded) as Relation[]
  for (const relation of relations) {
    data = sortEmbeddedResource(relation, data)
  }

  return data
}

function sortEmbeddedResource<T extends Yaml>(relation: Relation, data: T): T {
  data = {
    ...data,
    _embedded: {
      ...data._embedded,
      [relation]: byRecent(data._embedded[relation]),
    },
  }

  return {
    ...data,
    _embedded: {
      ...data._embedded,
      [relation]: data._embedded[relation].map(sortEmbedded),
    },
  } as T
}

function byRecent(items: Sortable[]): Sortable[] {
  return reverse(sortBy(items, item => buildSortTerm(item)))
}

function buildSortTerm(item: Sortable): string {
  const { begin_year, end_year } = item
  const beginYearTerm = begin_year || "0000"
  const endYearTerm = !end_year || end_year === "present" ? 9999 : end_year
  return `${endYearTerm}-${beginYearTerm}`
}
