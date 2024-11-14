require 'sinatra'
require 'net/http'
require 'json'
require 'net/http/post/multipart'

IPFS_API_URL = 'http://127.0.0.1:5001/api/v0'
IPFS_GATEWAY_URL = 'http://127.0.0.1:8080/ipfs'

before do
  response.headers['Access-Control-Allow-Origin'] = '*'
  response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
  response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
end

options '*' do
  200
end

post '/add' do
  if params[:file]
    file = params[:file][:tempfile]
    filename = params[:file][:filename]
    file_type = params[:file][:type] || 'application/octet-stream'

    uri = URI("#{IPFS_API_URL}/add")
    request = Net::HTTP::Post::Multipart.new(
      uri.path,
      "file" => UploadIO.new(file, file_type, filename)
    )

    response = Net::HTTP.start(uri.hostname, uri.port) { |http| http.request(request) }
    result = JSON.parse(response.body)

    content_type :json
    { cid: result['Hash'] }.to_json
  else
    status 400
    { error: 'No file uploaded' }.to_json
  end
end

get '/get/:cid' do
  cid = params[:cid]
  uri = URI("#{IPFS_GATEWAY_URL}/#{cid}")

  response = Net::HTTP.get_response(uri)

  if response.is_a?(Net::HTTPSuccess)
    content_type response['content-type']
    response.body
  else
    status response.code.to_i
    { error: 'Failed to retrieve content from IPFS' }.to_json
  end
end

set :port, 4567
set :bind, '0.0.0.0'
