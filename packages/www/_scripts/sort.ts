import { reverse, sortBy } from "lodash"

export async function itemsByRecent(data: {
  _embedded: { index: { begin_year; end_year }[] }
}) {
  if (!data?._embedded?.index) return data
  return {
    ...data,
    ...{ _embedded: { index: byRecent(data._embedded.index) } },
  }
}

// TODO - should use schools (better yet, classes) + projects
// TODO - doesn't do tie breakers well, see OS
export async function itemsByRecentWork(data: {
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

// TODO - should use schools (better yet, classes) + projects
export async function itemsByMostWork(data: {
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
export function byMostWork(resources: { _embedded: { projects } }[]) {
  return reverse(
    sortBy(resources, item =>
      noProjects(item) ? 0 : item._embedded.projects.length
    )
  )
}

export function byRecent(items: { begin_year; end_year }[]) {
  return reverse(sortBy(items, item => buildSortTerm(item)))
}

export function byFirstProject(items) {
  return sortBy(items, item => {
    if (noProjects(item)) return "0000-0000"
    const first = item._embedded.projects[0]
    return buildSortTerm(first)
  })
}

export function noProjects(resource: { _embedded: { projects } }) {
  return (
    !resource?._embedded?.projects || resource._embedded.projects.length < 1
  )
}

export function buildSortTerm({ begin_year, end_year }) {
  return `${end_year || "9999"}-${begin_year}`
}

export default {
  itemsByRecent,
  itemsByRecentWork,
  itemsByMostWork,
  byMostWork,
  byRecent,
  byFirstProject,
}
