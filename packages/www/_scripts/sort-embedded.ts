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
  return items.sort((a, b) => {
    const endYearA =
      !a.end_year || a.end_year === "present" ? 9999 : Number(a.end_year)
    const endYearB =
      !b.end_year || b.end_year === "present" ? 9999 : Number(b.end_year)
    if (endYearA !== endYearB) {
      return endYearB - endYearA
    }

    const beginYearA = a.begin_year ? Number(a.begin_year) : 0
    const beginYearB = b.begin_year ? Number(b.begin_year) : 0
    if (beginYearA !== beginYearB) {
      return beginYearB - beginYearA
    }

    return a.title.localeCompare(b.title)
  })
}
