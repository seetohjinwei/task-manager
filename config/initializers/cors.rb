# whitelist domains for cors
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "https://jinwei-task-manager.herokuapp.com"
    resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head], credentials: true
  end
end
# TODO: replace origin string with production url
