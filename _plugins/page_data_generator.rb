require 'find'

module Jekyll
  class PageDataGenerator < Jekyll::Generator
    def generate(site)
      files = get_data_files
      files.each do |file|
        puts file
        data = YAML.load_file(file)
        add_counts data
        update_item_page_data site, file, data
        update_list_page_data site, file, data unless file == '_data/index.yml'
      end
    end

    def get_data_files
      files = []
      Find.find('_data') do |file|
        if file=~/.yml$/
          files << file
        end
      end
      files
    end

    def add_counts(data)
      add_count data, 'work'
      add_count data, 'skills'
      add_count data, 'contact'
      add_count data, 'projects'
      add_count data, 'languages'
      add_count data, 'tools'
      add_count data, 'os'
    end

    def add_count(data, field)
      data["#{field}_count"] = data[field].size unless data[field].nil?
    end

    def update_item_page_data(site, file, data)
      path = file.gsub('_data/', '').gsub('.yml', '.md')
      page = site.pages.detect { |page| page.path == path }
      page.data.merge! data
    end

    def update_list_page_data(site, file, data)
      resource = file.match(/\/(?<resource>.+)\//)[1]
      path = resource + '/index.md'
      page = site.pages.detect { |page| page.path == path }
      page.data[resource] = [] if page.data[resource].nil?
      page.data[resource].push data
    end
  end
end
