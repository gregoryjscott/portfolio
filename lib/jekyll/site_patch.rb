module Jekyll
  class Site

    # alias_method :old_process, :process
    #
    # def process()
    #   old_process()
    # end

    def generate
      generators.each do |generator|
        puts generator
        generator.generate(self)
      end
    end
  end
end
