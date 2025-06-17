import { reverse, sortBy } from "lodash"

export function sortEmbedded(data: { _embedded: any }) {
  if (!data?._embedded) return data

  if (data._embedded?.db) {
    data = {
      ...data,
      _embedded: { ...data._embedded, db: byRecentProjects(data._embedded.db) },
    }
    data = {
      ...data,
      _embedded: {
        ...data._embedded,
        db: data._embedded.db.map(item => sortEmbedded(item)),
      },
    }
  }

  if (data._embedded?.jobs) {
    data = {
      ...data,
      _embedded: {
        ...data._embedded,
        jobs: byRecent(data._embedded.jobs),
      },
    }
    data = {
      ...data,
      _embedded: {
        ...data._embedded,
        jobs: data._embedded.jobs.map(item => sortEmbedded(item)),
      },
    }
  }

  if (data._embedded?.languages) {
    data = {
      ...data,
      _embedded: {
        ...data._embedded,
        languages: byRecentProjects(data._embedded.languages),
      },
    }
    data = {
      ...data,
      _embedded: {
        ...data._embedded,
        languages: data._embedded.languages.map(item => sortEmbedded(item)),
      },
    }
  }

  if (data._embedded?.os) {
    data = {
      ...data,
      _embedded: { ...data._embedded, os: byRecentProjects(data._embedded.os) },
    }
    data = {
      ...data,
      _embedded: {
        ...data._embedded,
        os: data._embedded.os.map(item => sortEmbedded(item)),
      },
    }
  }

  if (data._embedded?.projects) {
    data = {
      ...data,
      _embedded: {
        ...data._embedded,
        projects: byRecent(data._embedded.projects),
      },
    }
    data = {
      ...data,
      _embedded: {
        ...data._embedded,
        projects: data._embedded.projects.map(item => sortEmbedded(item)),
      },
    }
  }

  if (data._embedded?.tools) {
    data = {
      ...data,
      _embedded: {
        ...data._embedded,
        tools: byMostWork(data._embedded.tools),
      },
    }
    data = {
      ...data,
      _embedded: {
        ...data._embedded,
        tools: data._embedded.tools.map(item => sortEmbedded(item)),
      },
    }
  }

  return data
}

// Used by jobs and projects
function indexByRecent(data: {
  _embedded: { index: { begin_year; end_year }[] }
}) {
  if (!data?._embedded?.index) return data
  return {
    ...data,
    ...{ _embedded: { index: byRecent(data._embedded.index) } },
  }
}

// Used by languages, db, and os
// TODO - should use schools (better yet, classes) + projects
// TODO - doesn't do tie breakers well, see OS
function indexByRecentWork(data: {
  _embedded: { index: { _embedded: { projects } }[] }
}) {
  if (!data?._embedded?.index) return data
  for (const item of data._embedded.index) {
    if (noProjects(item)) continue
    item._embedded.projects = byRecent(item._embedded.projects)
  }
  const sortedItems = reverse(byFirstProject(data._embedded.index))
  return { ...data, ...{ _embedded: { index: sortedItems } } }
}

function byRecentProjects(items: { _embedded: { projects } }[]) {
  for (const item of items) {
    if (noProjects(item)) continue
    item._embedded.projects = byRecent(item._embedded.projects)
  }
  // console.log("byRecentProjects", items)
  const sortedItems = reverse(byFirstProject(items))
  return sortedItems
}

function itemByRecentWork(item: { _embedded: { projects } }) {
  if (noProjects(item)) return item
  item._embedded.projects = byRecent(item._embedded.projects)
  return item
}

// Used by tools
// TODO - should use schools (better yet, classes) + projects
function indexByMostWork(data: {
  _embedded: { index: { _embedded: { projects } }[] }
}) {
  if (!data?._embedded?.index) return data
  const sortedItems = byMostWork(data._embedded.index)
  for (const item of sortedItems) {
    if (noProjects(item)) continue
    item._embedded.projects = byRecent(item._embedded.projects)
  }
  return { ...data, ...{ _embedded: { index: sortedItems } } }
}

// function byMostProjects(items: { projects }[]) {
//   const sortedItems = reverse(
//     sortBy(items, item => (noProjects2(item) ? 0 : item.projects.length))
//   )
//   // TODO - recursive sort should take care of this
//   // for (const item of sortedItems) {
//   //   if (noProjects2(item)) continue
//   //   item.projects = byRecent(item.projects)
//   // }
//   return sortedItems
// }

// TODO - should use schools (better yet, classes) + projects
function byMostWork(resources: { _embedded: { projects } }[]) {
  return reverse(
    sortBy(resources, item =>
      noProjects(item) ? 0 : item._embedded.projects.length
    )
  )
}

function byRecent(items: { begin_year; end_year }[]) {
  return reverse(sortBy(items, item => buildSortTerm(item)))
}

function byFirstProject(items: { _embedded: { projects } }[]) {
  return sortBy(items, item => {
    if (noProjects(item)) return "0000-0000"
    const first = item._embedded.projects[0]
    return buildSortTerm(first)
  })
}

// function byFirstProject2(items: { projects }[]) {
//   return sortBy(items, item => {
//     if (noProjects2(item)) return "0000-0000"
//     const first = item.projects[0]
//     return buildSortTerm(first)
//   })
// }

function noProjects(resource: { _embedded: { projects } }) {
  return (
    !resource?._embedded?.projects || resource._embedded.projects.length < 1
  )
}

// function noProjects2(data: { projects }) {
//   return !data?.projects || data.projects.length < 1
// }

function buildSortTerm({ begin_year, end_year }) {
  return `${end_year || "9999"}-${begin_year}`
}

export default {
  indexByRecent,
  indexByRecentWork,
  indexByMostWork,

  itemByRecentWork,
}
