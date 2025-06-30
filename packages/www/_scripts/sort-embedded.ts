import { reverse, sortBy } from "lodash"

export function sortEmbedded(data: { _embedded: any }) {
  if (!data?._embedded) return data

  if (data._embedded?.db) {
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

function sortEmbeddedResource(
  resourceName: string,
  data: { _embedded: any }
): { _embedded: any } {
  data = {
    ...data,
    _embedded: {
      ...data._embedded,
      [resourceName]: byRecent(data._embedded[resourceName]),
    },
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

function byRecent(items: { begin_year; end_year }[]) {
  return reverse(sortBy(items, item => buildSortTerm(item)))
}

function buildSortTerm({ begin_year, end_year }) {
  const endYearTerm = !end_year || end_year === "present" ? 9999 : end_year
  return `${endYearTerm}-${begin_year}`
}
