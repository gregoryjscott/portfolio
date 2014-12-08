module Prep
  module OS
    class Index < Jekyll::Prep::Script

      def prepare(page)
        order_by_most_projects(page.data['items'])
      end

      def order_by_most_projects(items)
        items.sort_by! do |item|
          has_projects(item) ? item['_links']['projects'].size : 0
        end

        items.reverse!
      end

      def has_projects(item)
        !item['_links'].nil? and !item['_links']['projects'].nil?
      end

    end
  end
end
