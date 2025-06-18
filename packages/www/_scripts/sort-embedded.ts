import { reverse, sortBy } from "lodash"

export function sortEmbedded(data: { _embedded: any }) {
  if (!data?._embedded) return data

  if (data._embedded?.db) {
    data = {
      ...data,
      _embedded: {
        ...data._embedded,
        db: byRecentProjects(data._embedded.db),
      },
    }
    data = {
      ...data,
      _embedded: {
        ...data._embedded,
        db: data._embedded.db.map(sortEmbedded),
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
        jobs: data._embedded.jobs.map(sortEmbedded),
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
        languages: data._embedded.languages.map(sortEmbedded),
      },
    }
  }

  if (data._embedded?.os) {
    data = {
      ...data,
      _embedded: {
        ...data._embedded,
        os: byRecentProjects(data._embedded.os),
      },
    }
    data = {
      ...data,
      _embedded: {
        ...data._embedded,
        os: data._embedded.os.map(sortEmbedded),
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
        projects: data._embedded.projects.map(sortEmbedded),
      },
    }
  }

  if (data._embedded?.tools) {
    data = {
      ...data,
      _embedded: {
        ...data._embedded,
        tools: byMostProjects(data._embedded.tools),
      },
    }
    data = {
      ...data,
      _embedded: {
        ...data._embedded,
        tools: data._embedded.tools.map(sortEmbedded),
      },
    }
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
