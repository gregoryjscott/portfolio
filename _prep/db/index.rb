module Prep
  module DB
    class Index < Jekyll::Prep::Script

      def prepare(page)
        order_by_most_projects(page.data['items'])

        page.data['items'].each do |item|
          projects = item['_embedded']['projects'] unless item['_embedded'].nil?
          order_by_most_recent(projects) unless projects.nil?
        end
      end

      def order_by_most_projects(items)
        items.sort_by! do |item|
          has_projects(item) ? item['_links']['projects'].size : 0
        end

        items.reverse!
      end

      def order_by_most_recent(items)
        return if items.nil?

        items.sort! do |x, y|
          if x['begin_year'] < y['begin_year']
            -1
          elsif x['begin_year'] > y['begin_year']
            1
          else
            x_end = x['end_year'].nil? ? 9999 : x['end_year']
            y_end = y['end_year'].nil? ? 9999 : y['end_year']
            x_end <=> y_end
          end
        end

        items.reverse!
      end

      def has_projects(item)
        !item['_links'].nil? and !item['_links']['projects'].nil?
      end

    end
  end
end
