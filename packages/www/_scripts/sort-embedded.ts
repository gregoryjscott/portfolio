import { reverse, sortBy } from "lodash"
import { Relation, SortableItem, Yaml } from "./types"

export function sortEmbedded<T extends Yaml>(data: T): T {
  if (!data._embedded) {
    return data
  }

  if (data._embedded.db) {
    data = sortEmbeddedResource("db", data)
  }

  if (data._embedded?.jobs) {
    data = sortEmbeddedResource("jobs", data)
  }

  if (data._embedded?.languages) {
    data = sortEmbeddedResource("languages", data)
  }

  if (data._embedded?.os) {
    data = sortEmbeddedResource("os", data)
  }

  if (data._embedded?.projects) {
    data = sortEmbeddedResource("projects", data)
  }

  if (data._embedded?.schools) {
    data = sortEmbeddedResource("schools", data)
  }

  if (data._embedded?.tools) {
    data = sortEmbeddedResource("tools", data)
  }

  return data
}

function sortEmbeddedResource<T extends Yaml>(
  resourceName: Relation,
  data: T
): T {
  data = {
    ...data,
    _embedded: {
      ...data._embedded,
      [resourceName]: byRecent(data._embedded[resourceName]),
    },
  }

  return {
    ...data,
    _embedded: {
      ...data._embedded,
      [resourceName]: data._embedded[resourceName].map(sortEmbedded),
    },
  } as T
}

function byRecent(items: SortableItem[]): SortableItem[] {
  return reverse(sortBy(items, item => buildSortTerm(item)))
}

function buildSortTerm(item: SortableItem): string {
  const { begin_year, end_year } = item
  const endYearTerm = !end_year || end_year === "present" ? 9999 : end_year
  return `${endYearTerm}-${begin_year || "0000"}`
}
