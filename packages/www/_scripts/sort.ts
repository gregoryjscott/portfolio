import { reverse, sortBy } from "lodash"

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

function byFirstProject(items) {
  return sortBy(items, item => {
    if (noProjects(item)) return "0000-0000"
    const first = item._embedded.projects[0]
    return buildSortTerm(first)
  })
}

function noProjects(resource: { _embedded: { projects } }) {
  return (
    !resource?._embedded?.projects || resource._embedded.projects.length < 1
  )
}

function buildSortTerm({ begin_year, end_year }) {
  return `${end_year || "9999"}-${begin_year}`
}

export default {
  indexByRecent,
  indexByRecentWork,
  indexByMostWork,

  itemByRecentWork,
}
