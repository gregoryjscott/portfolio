require 'jekyll'
require 'jekyll/site_patch'
require 'minitest/autorun'

describe 'Jekyll::Site' do

  let(:config) do
    Jekyll.configuration({
      'source' => 'test/fixtures',
      'quiet' => true
    })
  end

  let(:site) { Jekyll::Site.new(config) }

  before(:each) do
    site.process
  end

  it 'does nothing' do
  end
end
