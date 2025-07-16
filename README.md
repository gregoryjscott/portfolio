# gregoryjscott.com

My data-driven portfolio website that combines Jekyll static site generation with TypeScript preprocessing and HAL (Hypertext Application Language) hypermedia principles. This project manages the relationships between my projects, languages, databases, tools, etc. and generates rich, interconnected content.

**Core Technologies:**
- **Jekyll**: Ruby-based static site generator
- **TypeScript**: Preprocessing scripts for data management
- **HAL**: Hypermedia standard for resource relationships
- **OpenAI API**: Automated content description generation

## What is HAL? 

HAL (Hypertext Application Language) is a minimal media type for representing resources and their relationships through standardized `_links` and `_embedded` sections. You can read the the formal spec here: https://datatracker.ietf.org/doc/html/draft-kelly-json-hal. My thanks to Mike Kelly for creating this simple yet powerful media type.

In this portfolio, HAL is used to manage relationships between resources (e.g., projects ↔ languages, databases, tools, etc.).

- `_links`: Links to related resources (e.g., projects ↔ languages)
- `_embedded`: Full resource data for related resources included inline to enable rich rendering

## How does it work?

1. **Markdown files** representing resources contain frontmatter with `_links` relationships.
2. **TypeScript scripts** (`npm run prep`) process these relationships and generate YAML files containing `_embedded` resource data.
3. **Jekyll plugin** (`_plugins/load.rb`) merges the generated YAML into each page's (Markdown) frontmatter at build time, making the embedded resources available to Jekyll templates.

### Markdown files contain `_links`

Resources maintain bidirectional relationships through `_links`.

```yaml
# Example: /projects/this-site.md that links to /languages/ts/
---

# ... other frontmatter

_links:
  self:
    href: /projects/this-site/
  languages:
    - href: /languages/ts/
---
```

```yaml
# Example: /languages/ts.md that links to /projects/this-site/
---

# ... other frontmatter

_links:
  self:
    href: /languages/ts/
  projects:
    - href: /projects/this-site/
---
```

### Typescript scripts generate YAML files containing `_embedded`

Typescript scripts generate YAML files containing `_embedded` sections by following `_links` relationships and embedding full resource details from the linked resources.

```yaml
# Example: _data/projects/this-site.yml that contains embedded /languages/ts/

# ... data copied from Markdown frontmatter including _links

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
          - href: /projects/this-site/
```

```yaml
# Example: _data/languages/ts.yml that contains embedded /projects/this-site/

# ... data copied from Markdown frontmatter including _links

_embedded:
  projects:
    - title: gregoryjscott.com
      desc: "My portfolio website that uses Jekyll to create static HTML pages using YAML..."
      role: Author
      begin_year: 2014
      end_year: present
      _links:
        self:
          href: /projects/this-site/
        languages:
          - href: /languages/ts/
```

The scripts also perform additional actions such as generating missing `desc` values using OpenAI, updating `**/index.md` files to include new resources, setting `used_begin_year` and `used_end_year` values based on the linked projects, and more.

### Jekyll merges YAML into Markdown frontmatter

The `_plugins/load.rb` Jekyll plugin merges the generated YAML into each page's (Markdown) frontmatter at build time, making the embedded resources available to Jekyll templates.

## Steps to add new content to the porfolio

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

## OpenAI Integration

### Setup

Set your OpenAI API key as an environment variable.

```bash
export OPENAI_API_KEY=your-api-key-here
```

### Configuration

The system uses OpenAI's latest API format with the `o4-mini` model.

```typescript
const client = new OpenAI()
const response = await client.responses.create({
  model: "o4-mini",
  input: prompt,
})
```

**Prompts are customized** based on technology type (language vs tool vs database) for relevant descriptions.

## Local Development Setup

### Prerequisites

- **Ruby** (for Jekyll)
- **Node.js** (for TypeScript scripts)
- **Bundler** (Ruby gem manager)

### Installation

```bash
# Install Node and Ruby dependencies
npm install && npm run bootstrap
```

### Development Workflow

```bash
# 1. Make content changes (add/edit .md files)
# 2. Run preprocessing
npm run prep

# 3. Build Jekyll site
npm run build

# 4. Start development server
npm run www

# 5. Open in browser
npm run open  # Opens http://127.0.0.1:4000
```

## Deployment

Deploy to GitHub Pages with a single command.

```bash
npm run deploy
```

This builds the site and pushes the `_site` directory to the `gregoryjscott.github.io` repository's master branch.
