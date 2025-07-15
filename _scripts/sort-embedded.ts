import { Relation, Resource, Sortable, Yaml } from "./types"

export function sortEmbedded<T extends Yaml>(
  resource: Resource,
  isIndex: boolean,
  data: T
): T {
  if (!data._embedded) {
    return data
  }

  const relations = Object.keys(data._embedded) as Relation[]
  for (const relation of relations) {
    data = sortEmbeddedResource(resource, relation, isIndex, data)
  }

  return data
}

function sortEmbeddedResource<T extends Yaml>(
  resource: Resource,
  relation: Relation,
  isIndex: boolean,
  data: T
): T {
  const sortMethod =
    (isIndex && resource.relation !== "resume") ||
    relation === "projects" ||
    relation === "jobs" ||
    relation === "schools"
      ? byRecent
      : byTitle

  data = {
    ...data,
    _embedded: {
      ...data._embedded,
      [relation]: sortMethod(data._embedded[relation]),
    },
  }

  return {
    ...data,
    _embedded: {
      ...data._embedded,
      [relation]: data._embedded[relation].map(item =>
        sortEmbedded(resource, false, item)
      ),
    },
  } as T
}

function byRecent(items: Sortable[]): Sortable[] {
  return items.sort((a, b) => {
    const beginYearAValue = a.used_begin_year || a.begin_year
    const beginYearBValue = b.used_begin_year || b.begin_year
    const endYearAValue = a.used_end_year || a.end_year
    const endYearBValue = b.used_end_year || b.end_year

    const endYearA =
      !endYearAValue || endYearAValue === "present"
        ? 9999
        : Number(endYearAValue)
    const endYearB =
      !endYearBValue || endYearBValue === "present"
        ? 9999
        : Number(endYearBValue)
    if (endYearA !== endYearB) {
      return endYearB - endYearA
    }

    const beginYearA = beginYearAValue ? Number(beginYearAValue) : 0
    const beginYearB = beginYearBValue ? Number(beginYearBValue) : 0
    if (beginYearA !== beginYearB) {
      return beginYearB - beginYearA
    }

    return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
  })
}

function byTitle(items: Sortable[]): Sortable[] {
  return items.sort((a, b) => {
    return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
  })
}
