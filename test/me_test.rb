require 'jekyll'
require 'jekyll/site_patch'
require 'minitest/autorun'

describe 'Jekyll::Site' do

  let(:config) do
    Jekyll.configuration({
      'source' => '_tmp/content',
      'quiet' => true
    })
  end

  let(:site) { Jekyll::Site.new(config) }

  before(:each) do
    site.process
  end

  it 'builds a website' do
  end
end
