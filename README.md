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
2. **TypeScript scripts** (`npm run prep`) process these relationships and generate corresponding YAML files containing `_embedded` resource data in `_data/`.
3. **Jekyll plugin** (`_plugins/load.rb`) merges the generated YAML into each page's (Markdown) frontmatter at build time, making the embedded resources available to Jekyll templates.

### Markdown files contain `_links`

Resources maintain bidirectional relationships through `_links`.

```yaml
# Example: /projects/this-site.md
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
# Example: /languages/ts.md
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

Typescript scripts generate YAML files containing `_embedded` sections by following `_links` relationships and including full resource details from the linked resources.

```yaml
# Example: _data/projects/this-site.yml
# ... data from frontmatter including _links
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
      # ... more embedded languages
```

```yaml
# Example: _data/languages/ts.yml  
# ... data from frontmatter including _links
_embedded:
  projects:
    - title: gregoryjscott.com
      desc: My portfolio website that uses Jekyll to create static HTML pages using YAML, Markdown, and HAL-based hypermedia.
      role: Author
      begin_year: 2014
      end_year: present
      _links:
        self:
          href: /projects/this-site/
        languages:
          - href: /languages/ts/
      # ... more embedded projects
```

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

**Markdown files:**

1. **Description Generation**: OpenAI generates a professional description in `/tools/docker.md`
2. **Bidirectional Links**: `/tools/docker.md` receives links back to `/projects/my-api/` 
3. **Index Updates**: `/tools/index.md` includes `/tools/docker.md` in its list of `tools`
4. **Used Year Range Calculation**: calculated year range is added to `/tools/docker.md` based on `/projects/my-api.md` (and potentially other projects)

**YAML files:**

5. **Embedding**: `_embedded` data is added to `_data/tools/docker.yml` and `/projects/my-api/` and is available to Jekyll templates at build time

### Final Result

The generated `_data/tools/docker.yml` file contains embedded data from `/projects/my-api.md`, an AI generated `desc` value, and calculated `used_begin_year` and `used_end_year` values.

```yaml
# Generated _data/tools/docker.yml
title: Docker
desc: "Docker is a containerization platform..."
used_begin_year: 2020
used_end_year: present
_links:
  self:
    href: /tools/docker/
  projects:
    - href: /projects/my-api/
_embedded:
  projects:
    - title: "My API Project"
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
          - href: /tools/docker/
          - href: /tools/node/
        db:
          - href: /db/postgres/
```

The generated `_data/projects/my-api.yml` file contains embedded data from `/tools/docker.md`.

```yaml
# Generated _data/projects/my-api.yml
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
    - href: /tools/docker/
    - href: /tools/node/
  db:
    - href: /db/postgres/
_embedded:
  # ... other embedded resources
  tools:
    - title: Docker
      desc: "Docker is a containerization platform..."
      used_begin_year: 2020
      used_end_year: present
      _links:
        self:
          href: /tools/docker/
        projects:
          - href: /projects/my-api/
  # ... other embedded resources
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
# Install Ruby and Node dependencies
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

## Key Files Reference

### Manual Files (You Edit)
- `*.md` - Content pages with minimal frontmatter
- `_layouts/` - Jekyll page templates
- `_includes/` - Reusable template components
- `assets/css/` - Stylesheets

### Generated Files (Scripts Create)
- `_data/**/*.yml` - Rich resource data with relationships
- `_site/` - Built Jekyll site (generated by `npm run build`)

### Configuration
- `_config.yml` - Jekyll configuration
- `package.json` - Node scripts and dependencies
- `Gemfile` - Ruby dependencies
- `tsconfig.json` - TypeScript compiler settings

### Scripts
- `_scripts/*.ts` - TypeScript preprocessing
- `_plugins/load.rb` - Jekyll plugin for data merging
