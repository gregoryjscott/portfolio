require 'find'

module Jekyll
  class PageDataGenerator < Jekyll::Generator
    def generate(site)
      files = get_data_files
      files.each do |file|
        data = YAML.load_file(file)
        add_links_counts data
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

    def add_links_counts(data)
      add_links_count data, 'work'
      add_links_count data, 'skills'
      add_links_count data, 'contact'
      add_links_count data, 'projects'
      add_links_count data, 'languages'
      add_links_count data, 'os'
    end

    def add_links_count(data, field)
      unless data['links'].nil? or data['links'][field].nil?
        data["#{field}_count"] = data['links'][field].size
      end
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
