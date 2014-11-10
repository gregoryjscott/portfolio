# me

**Me** is my attempt to put my data on the web.

The current vision is to use hypermedia to combine my resume, my skills matrix, and my own version of a [technology radar](http://www.thoughtworks.com/radar).

It's totally a work in progress. Most of the content is TODO. I'm a developer and this is my project so I did the programming first.

## Approach

**Me** uses [Jekyll](http://jekyllrb.com) - a static website generator.

Jekyll lets you organize your site into concepts such as data, content, style, and layout. Jekyll defines conventions that dictate how to name the files and directories. Jekyll's build process will combine everything and produce a website ready to be published.

**Me** follows standard Jekyll conventions but takes a disciplined approach to how content is defined. [Data](#data) is extracted from content and stored separately in YAML data files. [Content](#content) is written in Markdown, it uses the data provided by the data files, and is kept free of layout.

## Data

Data is defined in YAML files with a `.yml` extension. Data files are designed to be consumed by machines (software), but YAML is simple enough to be read and edited by humans.

Each data file must have a corresponding [content file](#content) that displays the data, along with  additional content intended for humans.

Data files are stored in the [`_data`](_data) folder, following Jekyll's Data Files convention. The `_data` directory is essentially the database for the website.

> Data is injected into the content files during the build process, therefore content files don't need to search for their data in the `site.data`  container. See the [plugins](#plugins) section to learn how the data is used.

### [`_data/db/`](_data/db)

Contains one data file for each database. Each one has a corresponding content file in `db/`.

### [`_data/languages/`](_data/languages)

Contains one data file for each language. Each one has a corresponding content file in `languages/`.

### [`_data/os/`](_data/os)

Contains one data file for each operating system. Each one has a corresponding content file in `os/`.

### [`_data/projects/`](_data/projects)

Contains one data file for each project. Each one has a corresponding content file in `projects/`.

### Examples

Example data files are in the [`_eg`](_eg) directory. They can be used as a template for new data files.

## Content

The content is stored in Markdown files with a `.md` extension. They can optionally have a corresponding data file. Content shouldn't define data - it's purpose is to display it, describe it, etc. The data is obviously important, but perhaps not as important as _good_ content.

Content is written by humans for humans. This means that good writing is what makes good content. One reason for extracting the content into simple Markdown files is to make it easier for writers to contribute content. Writers don't need be concerned with layout and can focus on creating great content.

Content can also contain hyperlinks to related content, either within this web site or at other locations on the web. Links should be stored in the corresponding data file and referenced from the content.

Content is organized into directories at the root of the project. The Jekyll build process uses the directory and file names to produce the URLs of the website. For example, the file `languages/js.md` becomes the website page at `http://gregoryjscott/languages/js`.

Finally, there is a [`index.md`](index.md) file at the root that is the home page of the web site. The home page is the front door to the content.

### [`db/`](db)

Contains one content file for each database. Each one has a corresponding data file in `_data/db/`. There is also an `index.md` file that displays all databases.

### [`languages/`](languages)

Contains one content file for each language. Each one has a corresponding data file in `_data/languages/`. There is also an `index.md` file that displays all languages.

### [`os/`](os)

Contains one content file for each operating system. Each one has a corresponding data file in `_data/os/`. There is also an `index.md` file that displays all operating systems.

### [`projects/`](projects)

Contains one content file for each projects. Each one has a corresponding data file in `_data/projects/`. There is also an `index.md` file that displays all projects.

### [`resume/`](resume)

The resume view is a special case that combines all the data and content into a resume format.

### [`index.md`](index.md)

The home page.

## Layouts

Each content file results in a standalone HTML web page. One could create each standalone HTML page manually but the HTML markup surrounding the content is often the same between sets of pages. Layouts allow for defining that boilerplate HTML and then just referencing it from the content files. This allows the content to be free of layout and writers can just focus on producing great content.

Layouts are stored in the [`_layouts`](_layouts) directory.

## Includes

Includes are related to layouts in that they are designed to capture repeated markup, however includes are included in your content, where layouts wrap your content.

Includes are stored in the [`_includes`](_includes) directory.

## Style

Style is defined as cascading stylesheets in the [`css`](css) folder. For now.

## Plugins

The [`_plugins`](_plugins) directory stores Jekyll plugins. There is one custom Jekyll plugin in play - [`PageDataGenerator`](_plugins/page_data_generator.rb).

`PageDataGenerator` traverses the data files, adds fields used sorting, and then injects the data into its corresponding content page. For example, if the `_data/languages/js.yml` file contains a field called `desc`, then `languages/js.md` can access the value of `desc` using the `page.desc` property. Additionally, the `_data/languages/index.md` file will receive a `page.languages` property that contains the list of languages.

I'm not proud of the code or the approach but I haven't come up with anything elegant yet.
