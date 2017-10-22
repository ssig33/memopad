require 'bundler'
Bundler.require

get '/*' do
  begin
    file =  params[:splat].first
    open("public/" + file).read
  rescue
    open("public/index.html").read
  end
end
