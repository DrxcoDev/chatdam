require 'net/http'
require 'json'
require 'env'

# Configura tu token de acceso personal y el nombre del repositorio
token = procces.env(token)
owner = procces.env(token)
repo = procces.env(token)

# Realiza una solicitud a la API de GitHub
uri = URI("https://api.github.com/repos/#{owner}/#{repo}")
request = Net::HTTP::Get.new(uri)
request["Authorization"] = "token #{token}"

response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
  http.request(request)
end

if response.is_a?(Net::HTTPSuccess)
  repo_info = JSON.parse(response.body)
  puts "Repositorio: #{repo_info['full_name']}"
  puts "Privado: #{repo_info['private'] ? 'Sí' : 'No'}"
else
  puts "Error al obtener la información del repositorio: #{response.message}"
end
