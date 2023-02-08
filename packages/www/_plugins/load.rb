module Jekyll
    module Load
      class Loader < Jekyll::Generator

        priority :high

        def generate(site)
          @site = site
          Dir.chdir(@site.source) { load_pages }
        end

        def load_pages
          data_files = Dir[File.join('_data', '**', '*.yml')]
          data_files.each do |data_file|
            page = find_page(data_file)
            data = YAML.load_file(data_file)
            unless page.nil?
              merge_data page, data
            end
          end
        end

        def merge_data(page, data)
          page.data.merge! data
          page.data['url'] = page.url
          page.data
        end

        def find_page(data_file)
          path = data_file.gsub("_data#{File::SEPARATOR}", '').gsub('.yml', '.md')
          @site.pages.detect { |page| page.path == path }
        end

      end
    end
  end
