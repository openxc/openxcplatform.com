require 'html/proofer'
require 'rake/testtask'
require 'open-uri'

def build
  if not system "bundle exec jekyll build"
    raise "Build failed"
  end
end

def serve(port=nil, local_dev=true)
  Process.spawn("bundle exec jekyll serve --host 0.0.0.0 #{"-P #{port}" if port } -w")
end

namespace :test do
  Rake::TestTask.new(:unit_tests) do |test|
    test.libs << 'test'
    test.test_files = FileList['tests/**/test_*.rb']
    test.verbose = true
  end
end

task :test do
  begin
    pid = serve(4001, false)

    10.times do
      begin
        open("http://localhost:4001")
        break
      rescue SystemCallError
        sleep 2
      end
    end

    HTML::Proofer.new("./_site",
        :href_ignore => ["#"],
        :alt_ignore => [
        ],
        :disable_external => true,
        :check_favicon => false,
        :parallel => { :in_processes => 4},
    ).run
    sleep 2
    Rake::Task['test:unit_tests'].invoke
  ensure
    # TODO this causes a big interrupt trackback but it's OK to ignore, but it
    # would be nice to silence that so the test output is more visible.
    Process.kill(:SIGINT, pid)
  end
end

task :clean do
  rm_rf "./_site"
end

task :serve do
  pid = serve()
  Process.wait(pid)
end

task :build do
  build()
end

task :tidy do
  system 'find _site -name "*.html" -exec echo {} \; -exec tidy -errors -q {} \;'
end
