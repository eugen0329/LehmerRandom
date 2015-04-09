task :all do
  Rake::Task[:sass].invoke
  Rake::Task[:slim].invoke
end

desc 'Compile stylesheets from .sass to .css'
task :sass do
  puts 'sass compilation'
end

desc 'Compile from .slim to .html'
task :slim do
  puts 'slim compilation'
end

task default: :all
