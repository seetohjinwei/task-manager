class RegistrationsController < ApplicationController
  def create
    user = User.create!(
      username: params["username"],
      password: params["password"],
      password_confirmation: params["password_confirmation"],
      display_done: true,
      strict_search: false,
      sort_method: "default"
    )
    if user
      session[:user_id] = user.id
      render json: {
        status: "success",
        user: user
      }, status: 200
    else
      render json: {
        status: "error"
      }, status: 500
    end
  end
end
