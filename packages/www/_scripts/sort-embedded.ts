import { reverse, sortBy } from "lodash"

export function sortEmbedded(data: { _embedded: any }) {
  if (!data?._embedded) return data

  if (data._embedded?.db) {
    data = sortEmbeddedResource("db", data, byRecentProjects)
  }

  if (data._embedded?.jobs) {
    data = sortEmbeddedResource("jobs", data, byRecent)
  }

  if (data._embedded?.languages) {
    data = sortEmbeddedResource("languages", data, byRecentProjects)
  }

  if (data._embedded?.os) {
    data = sortEmbeddedResource("os", data, byRecentProjects)
  }

  if (data._embedded?.projects) {
    data = sortEmbeddedResource("projects", data, byRecent)
  }

  if (data._embedded?.schools) {
    data = sortEmbeddedResource("schools", data, byRecent)
  }

  if (data._embedded?.tools) {
    data = sortEmbeddedResource("tools", data, byMostProjects)
  }

  return data
}

function sortEmbeddedResource(
  resourceName: string,
  data: { _embedded: any },
  sortMethod: (items) => any
): { _embedded: any } {
  if (Array.isArray(data._embedded[resourceName])) {
    data = {
      ...data,
      _embedded: {
        ...data._embedded,
        [resourceName]: sortMethod(data._embedded[resourceName]),
      },
    }
  } else {
    // The embedded resource must be an "index" object, so use __its__ embedded resource.
    data = {
      ...data,
      _embedded: {
        ...data._embedded,
        [resourceName]: sortMethod(
          data._embedded[resourceName]._embedded[resourceName]
        ),
      },
    }
  }

  data = {
    ...data,
    _embedded: {
      ...data._embedded,
      [resourceName]: data._embedded[resourceName].map(sortEmbedded),
    },
  }

  return data
}

function byRecentProjects(items: { _embedded: { projects } }[]) {
  for (const item of items) {
    if (hasNoProjects(item)) continue
    item._embedded.projects = byRecent(item._embedded.projects)
  }
  const sortedItems = reverse(byFirstProject(items))
  return sortedItems
}

function byMostProjects(items: { _embedded: { projects } }[]) {
  return reverse(
    sortBy(items, item =>
      hasNoProjects(item) ? 0 : item._embedded.projects.length
    )
  )
}

function byRecent(items: { begin_year; end_year }[]) {
  return reverse(sortBy(items, item => buildSortTerm(item)))
}

function byFirstProject(items: { _embedded: { projects } }[]) {
  return sortBy(items, item => {
    if (hasNoProjects(item)) return "0000-0000"
    const first = item._embedded.projects[0]
    return buildSortTerm(first)
  })
}

function hasNoProjects(item: { _embedded: { projects } }) {
  return !item?._embedded?.projects || item._embedded.projects.length < 1
}

function buildSortTerm({ begin_year, end_year }) {
  return `${end_year || "9999"}-${begin_year}`
}
