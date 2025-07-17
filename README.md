# Gregory J. Scott's Portfolio

This project generates the content for [gregoryjscott.com](https://gregoryjscott.com) by combining Jekyll static site generation with TypeScript preprocessing and HAL hypermedia principles. It manages the relationships between my projects, languages, databases, tools, etc. and generates rich, interconnected content.

**Core Technologies:**
- **HAL**: Hypermedia standard for resource relationships
- **Jekyll**: Ruby-based static site generator
- **TypeScript**: Preprocessing scripts for data management
- **OpenAI API**: Automated content description generation

## What is HAL? 

HAL (Hypertext Application Language) is a minimal media type for representing resources and their relationships through standardized `_links` and `_embedded` sections. You can read the the formal spec here: https://datatracker.ietf.org/doc/html/draft-kelly-json-hal. My thanks to Mike Kelly for creating this simple yet powerful media type.

In this portfolio, HAL is used to manage relationships between resources (e.g., projects ↔ languages, projects ↔ databases, projects ↔ tools, etc.).

- `_links`: Links to related resources
- `_embedded`: Full resource data for related resources included inline to enable rendering rich content

## How does it work?

### Markdown files contain `_links`

Markdown files representing resources (projects, languages, databases, tools, etc.) contain frontmatter with `_links` relationships that maintain bidirectional connections between resources.

```yaml
# Example: /projects/portfolio.md that links to /languages/ts/
---

# ... other frontmatter

_links:
  self:
    href: /projects/portfolio/
  languages:
    - href: /languages/ts/
---
```

```yaml
# Example: /languages/ts.md that links back to /projects/portfolio/
---

# ... other frontmatter

_links:
  self:
    href: /languages/ts/
  projects:
    - href: /projects/portfolio/
---
```

### TypeScript scripts generate YAML files containing `_embedded`

For each Markdown file, the TypeScript scripts (`npm run prep`) process the relationships found in `_links` and generate a corresponding YAML file in the `_data` directory that contains `_embedded` resource data for all linked resources.

```yaml
# Example: /_data/projects/portfolio.yml that contains embedded data from /languages/ts.md

# ... data copied from /projects/portfolio.md frontmatter including _links

_embedded:
  languages:
    - title: TypeScript
      desc: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript..."
      used_begin_year: 2014
      used_end_year: present
      _links:
        self:
          href: /languages/ts/
        projects:
          - href: /projects/portfolio/
```

```yaml
# Example: /_data/languages/ts.yml that contains embedded data from /projects/portfolio.md

# ... data copied from /languages/ts.md frontmatter including _links

_embedded:
  projects:
    - title: gregoryjscott.com
      desc: "My portfolio website that uses Jekyll to create static HTML pages using YAML..."
      role: Author
      begin_year: 2014
      end_year: present
      _links:
        self:
          href: /projects/portfolio/
        languages:
          - href: /languages/ts/
```

The scripts also perform additional actions such as generating missing `desc` values using OpenAI, updating `**/index.md` files to include all resources, creating missing back links, setting `used_begin_year` and `used_end_year` values based on the linked projects, and more.

### Jekyll plugin merges YAML into Markdown frontmatter

The `_plugins/load.rb` Jekyll plugin merges the generated YAML into each page's Markdown frontmatter at build time, making the embedded resources available to Jekyll templates.

```liquid
<!-- Example: Language page template displaying embedded projects -->

<h1>Language: {{ page.title }}</h1>

{% if page._embedded.projects %}
  <section>
    <h2>Projects ({{ page._embedded.projects | size }})</h2>
    {% for project in page._embedded.projects %}
      <h3>{{ project.title }}</h3>
      <p>{{ project.desc }}</p>
      <p>{{ project.role }}, {{ project.begin_year }}-{{ project.end_year }}</p>
    {% endfor %}
  </section>
{% endif %}
```

```liquid
<!-- Example: Project page template displaying embedded languages -->

<h1>Project: {{ page.title }}</h1>

{% if page._embedded.languages %}
  <section>
    <h2>Languages ({{ page._embedded.languages | size }})</h2>
    {% for language in page._embedded.languages %}
      <h3>{{ language.title }}</h3>
      <p>{{ language.desc }}</p>
      <p>Used {{ language.used_begin_year }}-{{ language.used_end_year }}</p>
    {% endfor %}
  </section>
{% endif %}
```

## Adding new content

Below are the steps to add a new resource to the portfolio. In this example, we'll add "Docker" as a new tool resource.

### Step 1: Create the new resource file

Create `/tools/docker.md` with minimal frontmatter.

```yaml
---
layout: details
title: Docker
_links:
  self:
    href: /tools/docker/
---
```

### Step 2: Link to the resource from a project

Update an existing project (e.g., `/projects/my-api.md`) to reference the new tool.

```diff
---
layout: details
title: My API Project
desc: "RESTful API service for managing user data and authentication"
role: "Lead Developer"
begin_year: 2020
end_year: present
_links:
  self:
    href: /projects/my-api/
  languages:
    - href: /languages/ts/
  tools:
+   - href: /tools/docker/
    - href: /tools/node/
  db:
    - href: /db/postgres/
---
```

### Step 3: Run `npm run prep`

```bash
npm run prep
```

The same steps apply to adding any type of resource - languages, databases, tools, etc.

## Setup

### Prerequisites

- **Ruby** (for Jekyll)
- **Node.js** (for TypeScript scripts)
- **Bundler** (Ruby gem manager)

### Installation

```bash
# Install npm modules and Ruby gems.
npm install && npm run bootstrap
```

### Configure OpenAI

Set your OpenAI API key as an environment variable.

```bash
export OPENAI_API_KEY=your-api-key-here
```

## Workflow

```bash
# 1. Make content changes (add/edit .md files).
# 2. Run preprocessing.
npm run prep

# 3. Start development server that watches for changes.
npm run www

# 4. From another terminal, open the website in browser.
npm run open  # Opens http://127.0.0.1:4000
```

## Deployment

Deploy to GitHub Pages with a single command.

```bash
npm run deploy
```

This builds the site and pushes the `_site` directory to the `gregoryjscott.github.io` repository's master branch.
