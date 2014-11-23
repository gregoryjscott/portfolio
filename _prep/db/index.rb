module Prep
  module DB
    class Index < Jekyll::Prep::Script

      def prepare(page)
        order_by_most_projects(page.data['items'])
      end

      def order_by_most_projects(items)
        items.sort_by! do |item|
          has_projects(item) ? item['links']['projects'].size : 0
        end

        items.reverse!
      end

      def has_projects(item)
        !item['links'].nil? and !item['links']['projects'].nil?
      end

    end
  end
end
