if Rails.env == "production"
  # replace localhost with actual domain
  Rails.application.config.session_store :cookie_store, key: "_task_manager", domain: "localhost"
else
  Rails.application.config.session_store :cookie_store, key: "_task_manager"
end
