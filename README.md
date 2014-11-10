# me

Me is my attempt to put my data on the web.

The current vision is to use hypermedia to combine my resume, my skills matrix, and my own version of a [technology radar](http://www.thoughtworks.com/radar).

It is built with technologies like git, YAML, JSON, Markdown, and Jekyll.

It's totally a work in progress. Most of the content is "TODO". I'm a developer and this is my project so I did the programming first.

## data

Data is stored in the [`_data`](_data) folder following Jekyll's Data Files convention. I'm not actually using the built-in Data Files functionality of Jekyll (see the [plugins](#plugins) section to learn how the data is used), but maybe I will later and I needed some place to put it.

The data is stored in YAML files with a `.yml` extension. They must have a corresponding content file (see [views](#views)) that defines how the data will be displayed. The purpose of the YAML file is to extract out the data into a separate file instead of embedding it in the view. The data files are intended for machines (software) to read and provides power for things like processing the data, transforming it to formats that tools can consume, etc.

The `_data` directory is essentially the database for the website.

### [`_data/db/`](_data/db)

Contains one data file for each database. Each one has a corresponding content file in `db/`.

### [`_data/languages/`](_data/languages)

Contains one data file for each language. Each one has a corresponding content file in `languages/`.

### [`_data/os/`](_data/os)

Contains one data file for each operating system. Each one has a corresponding content file in `os/`.

### [`_data/projects/`](_data/projects)

Contains one data file for each project. Each one has a corresponding content file in `projects/`.

## examples

Example data files are in the [`_eg`](_eg) directory. They can be used as a template for new data files.

## views

The views produce the HTML pages that are published to the web. The views are made up of three concepts - content, layouts, and includes.

### content

The content is stored in Markdown files with a `.md` extension. They can optionally have a corresponding data file. Content shouldn't define data - it's purpose is to display it, describe it, etc. The data is obviously important, but perhaps not as important as _good_ content.

Content is written by humans for humans. This means that good writing is what makes good content. One reason for extracting the content into simple Markdown files is to make it easier for writers to contribute content. Writers don't need be concerned with layout and can focus on creating great content.

Content can also contain hyperlinks to related content, either within this web site or at other locations on the web. Links should be stored in the corresponding data file and referenced from the content.

Content is organized into directories at the root of the project. The Jekyll build process uses the directory and file names to produce the URLs of the website. For example, the file `languages/js.md` becomes the website page at `http://gregoryjscott/languages/js`.

Finally, there is a [`index.md`](index.md) file at the root that is the home page of the web site. The home page is the front door to the content.

#### [`db/`](db)

Contains one content file for each database. Each one has a corresponding data file in `_data/db/`. There is also an `index.md` file that displays all databases.

#### [`languages/`](languages)

Contains one content file for each language. Each one has a corresponding data file in `_data/languages/`. There is also an `index.md` file that displays all languages.

#### [`os/`](os)

Contains one content file for each operating system. Each one has a corresponding data file in `_data/os/`. There is also an `index.md` file that displays all operating systems.

#### [`projects/`](projects)

Contains one content file for each projects. Each one has a corresponding data file in `_data/projects/`. There is also an `index.md` file that displays all projects.

#### [`resume/`](resume)

The resume view is a special case that combines all the data and content into a resume format.

#### [`index.md`](index.md)

The home page.

### layouts

Each content file results in a complete standalone HTML web page. One could create each page manually but the boilerplate HTML surrounding the specific content is often the same between sets of pages. Layouts allow for defining that boilerplate HTML and then just referencing it from the content files. This allows the content to be free of layout and writers can just focus on producing great content.

Layouts are stored in the [`_layouts`](_layouts) directory.

### includes

Includes are related to layouts in that they are designed to capture repeated content, however includes are included in your content, where layouts wrap your content.

Includes are stored in the [`_includes`](_includes) directory.

## style

Style is defined as cascading stylesheets in the [`css`](css) folder. For now.

## plugins

The [`_plugins`](_plugins) directory stores Jekyll plugins. There is one custom Jekyll plugin in play - `page_data_generator`. It currently traverses the data files, adds some counts used by the views for sorting, and injects the data into its corresponding page. For example, if the `_data/languages/js.yml` file contains a field called `desc`, then `languages/js.md` can access its value using `page.desc`.

I'm not proud of the code or the approach but I haven't come up with anything elegant yet.
