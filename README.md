# me

**Me** is my data on the web.

The vision is to use hypermedia to combine my resume, my skills matrix, and my own version of a [technology radar](http://www.thoughtworks.com/radar).

It's totally a work in progress. Most of the content is TODO. I'm a developer and this is my project so I did the programming first.

## Approach

**Me** uses [Jekyll](http://jekyllrb.com) - a static website generator.

Jekyll makes it easy to organize your website files into concepts such as data, free-flow content, style, and layout. Jekyll defines conventions that dictate how to name the files and directories. Jekyll's build process transforms the files into a static website ready to be published to the web.

**Me** follows standard Jekyll conventions but takes a more opinionated approach to how content is defined. [Data](#data) is extracted from content and stored separately in data files written in YAML. Data files have correspoding [pages files](#pages), written in Markdown, that render the data along with free-form content.

## Data

Data is defined in YAML files with a `.yml` extension. Data files are designed to be consumed by machines (software), but YAML is simple enough to be read and edited by humans.

Each data file must have a corresponding [page file](#pages) that will display the data. Data is injected into the pages during the build process, therefore pages don't need to search for their data in the `site.data` container. See the [plugins](#plugins) section to learn more.

Data files are stored in the [`_data`](_data) directory. The `_data` directory acts as the database for the website.

### [`_data/db/`](_data/db)

Contains one data file for each database. Each one has a corresponding page file in [`db/`](db).

### [`_data/languages/`](_data/languages)

Contains one data file for each language. Each one has a corresponding page file in [`languages/`](languages).

### [`_data/os/`](_data/os)

Contains one data file for each operating system. Each one has a corresponding page file in [`os/`](os).

### [`_data/projects/`](_data/projects)

Contains one data file for each project. Each one has a corresponding page file in [`projects/`](projects).

## Pages

Pages are defined in Markdown files with a `.md` extension. Pages contain free-form content written by humans for humans.

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

Each page file becomes a standalone HTML web page. The HTML markup surrounding the page content is often the same between sets of pages. Layouts allow for extracting the markup that wraps the content and then just referencing it from page files.

Layouts are stored in the [`_layouts`](_layouts) directory.

## Includes

Includes are related to layouts in that they are designed to capture repeated markup, however includes are included in your content, where layouts wrap your content.

Includes are stored in the [`_includes`](_includes) directory.

## Style

Style is defined as cascading stylesheets in the [`css`](css) directory. For now.

## Plugins

Plugins allow for running custom code as part of the Jekyll build process.

Plugins are stored in the [`_plugins`](_plugins) directory. **Me** has one plugin - `PageDataGenerator`.

### [`PageDataGenerator`](_plugins/page_data_generator.rb)

`PageDataGenerator` reads the data, adds some custom fields used sorting, and then injects the data into their corresponding pages.

For example, if the `_data/languages/js.yml` data file contains a field called `desc`, then `languages/js.md` page file can access the value of `desc` using the `page.desc` property. Additionally, the `_data/languages/index.md` file will receive a `page.languages` property that contains the list of languages.

I'm not real happy with this but I've decided to keep hacking at it until I come up with a more elegant approach.
