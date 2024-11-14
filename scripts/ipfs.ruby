require 'sinatra'
require 'net/http'
require 'json'
require 'net/http/post/multipart'

IPFS_API_URL = 'http://127.0.0.1:5001/api/v0'
IPFS_GATEWAY_URL = 'http://127.0.0.1:8080/ipfs'

# Endpoint to add a file to IPFS
post '/add' do
  if params[:file]
    # File upload details from params
    file = params[:file][:tempfile]
    filename = params[:file][:filename]
    file_type = params[:file][:type] || 'application/octet-stream'

    # Set up the request to IPFS
    uri = URI("#{IPFS_API_URL}/add")
    request = Net::HTTP::Post::Multipart.new(
      uri.path,
      "file" => UploadIO.new(file, file_type, filename)
    )

    # Send request to IPFS
    response = Net::HTTP.start(uri.hostname, uri.port) { |http| http.request(request) }
    result = JSON.parse(response.body)

    # Return the CID of the uploaded file
    content_type :json
    { cid: result['Hash'] }.to_json
  else
    status 400
    { error: 'No file uploaded' }.to_json
  end
end

# Endpoint to fetch a file from IPFS by CID
get '/get/:cid' do
  cid = params[:cid]
  uri = URI("#{IPFS_GATEWAY_URL}/#{cid}")

  # Fetch content from IPFS
  response = Net::HTTP.get_response(uri)

  if response.is_a?(Net::HTTPSuccess)
    # Return the file contents directly
    content_type response['content-type']
    response.body
  else
    status response.code.to_i
    { error: 'Failed to retrieve content from IPFS' }.to_json
  end
end

# Start the server on port 4567
set :port, 4567
set :bind, '0.0.0.0'
