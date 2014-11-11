# me

**Me** is my data on the web.

The vision is to use hypermedia to combine my resume, my skills matrix, and my own version of a [technology radar](http://www.thoughtworks.com/radar).

It's totally a work in progress. Most of the content is TODO. I'm a developer and this is my project so I did the programming first.

## Approach

**Me** uses [Jekyll](http://jekyllrb.com) - a static website generator.

Jekyll lets you organize your site into concepts such as data, free-flow content, style, and layout. Jekyll defines conventions that dictate how to name the files and directories. Jekyll's build process takes the files and produces a static website ready to be published to the web.

**Me** follows standard Jekyll conventions but takes a disciplined approach to how content is defined. [Data](#data) is extracted from content and stored separately in YAML data files. Data files have correspoding [pages files](#pages), written in Markdown, that render the data along with free-form content.

## Data

Data is defined in YAML files with a `.yml` extension. Data files are designed to be consumed by machines (software), but YAML is simple enough to be read and edited by humans.

Each data file must have a corresponding [page file](#pages) that will display the data.

Data files are stored in the [`_data`](_data) folder, following Jekyll's Data Files convention. The `_data` directory is essentially the database for the website.

> Data is injected into the pages during the build process, therefore pages don't need to search for their data in the `site.data` container. See the [plugins](#plugins) section to learn how the data is used.

### [`_data/db/`](_data/db)

Contains one data file for each database. Each one has a corresponding page file in [`db/`](db).

### [`_data/languages/`](_data/languages)

Contains one data file for each language. Each one has a corresponding page file in [`languages/`](languages).

### [`_data/os/`](_data/os)

Contains one data file for each operating system. Each one has a corresponding page file in [`os/`](os).

### [`_data/projects/`](_data/projects)

Contains one data file for each project. Each one has a corresponding page file in [`projects/`](projects).

### Examples

Example data files are in the [`_eg`](_eg) directory. They can be used as a template for new data files.

## Pages

Pages are defined in Markdown files with a `.md` extension. Pages are free-form content written by humans for humans.

Pages can optionally have a corresponding data file. Pages can then combine the data with free-form content. Content is often related to other content, either within the website or at other locations on the web. Links to related content are stored in data files and displayed by page files as hyperlinks.

Pages are organized into directories at the root of the project. Jekyll uses the directory and file names to produce the URLs of the website. For example, the file `languages/js.md` becomes `http://gregoryjscott/languages/js`.

Finally, there is a [`index.md`](index.md) file that is the home page.

### [`db/`](db)

Contains one page file for each database. Each one has a corresponding data file in [`_data/db/`](_data/db).

`db/` also contains an [`index.md`](db/index.md) file that displays all databases.

### [`languages/`](languages)

Contains one page file for each language. Each one has a corresponding data file in [`_data/languages/`](_data/languages).

`languages/` also contains an [`index.md`](languages/index.md) file that displays all languages.

### [`os/`](os)

Contains one page file for each operating system. Each one has a corresponding data file in [`_data/os/`](_data/os).

`os/` also contains an [`index.md`](os/index.md) file that displays all operating systems.

### [`projects/`](projects)

Contains one page file for each projects. Each one has a corresponding data file in [`_data/projects/`](_data/projects).

`projects/` also contains an [`index.md`](projects/index.md) file that displays all projects.

### [`resume/`](resume)

The resume page is a special case that combines all the data and content into a resume format.

### [`index.md`](index.md)

The home page is the front door to the content.

## Layouts

Each page file results in a standalone HTML web page. One could create each standalone HTML page manually but the HTML markup surrounding the content is often the same between sets of pages. Layouts allow for defining that boilerplate HTML and then just referencing it from the page files. This allows the content to be free of layout and writers can just focus on producing great content.

Layouts are stored in the [`_layouts`](_layouts) directory.

## Includes

Includes are related to layouts in that they are designed to capture repeated markup, however includes are included in your content, where layouts wrap your content.

Includes are stored in the [`_includes`](_includes) directory.

## Style

Style is defined as cascading stylesheets in the [`css`](css) folder. For now.

## Plugins

The [`_plugins`](_plugins) directory stores Jekyll plugins. There is one custom Jekyll plugin in play - [`PageDataGenerator`](_plugins/page_data_generator.rb).

`PageDataGenerator` reads the data, adds custom fields used sorting, and then injects the data into their corresponding pages. For example, if the `_data/languages/js.yml` data file contains a field called `desc`, then `languages/js.md` page file can access the value of `desc` using the `page.desc` property. Additionally, the `_data/languages/index.md` file will receive a `page.languages` property that contains the list of languages.

I'm not proud of the code or the approach but I haven't come up with anything elegant yet.
