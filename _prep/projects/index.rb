module Prep
  module Projects
    class Index < Jekyll::Prep::Script

      def prepare(page)
        order_by_most_recent(page.data['items'])

        page.data['items'].each { |item| set_subtitle(item) }
      end

      def order_by_most_recent(items)
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

      def set_subtitle(item)
        subtitle = "#{item['role']}, #{item['begin_year']}"

        unless item['begin_year'] == item['end_year']
          end_string = item['end_year'].nil? ? 'present' : item['end_year'].to_s
          subtitle << " - #{end_string}"
        end

        item['subtitle'] = subtitle
      end

    end
  end
end
