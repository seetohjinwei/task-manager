class SessionsController < ApplicationController
  include CurrentUserConcern

  def create
    # params is sent by frontend
    user = User
      .find_by(username: params["username"])
      .try(:authenticate, params["password"])
    if user
      # storing in cookie if login successful
      session[:user_id] = user.id
      render json: {
        status: "success",
        user: user
      }, status: 200
    else
      # failed to login
      render json: {
        status: "not authorized"
      }, status: 401
    end
  end

  def logged_in
    if @current_user
      render json: {
        status: "logged in",
        logged_in: true,
        user: @current_user
      }, status: 200
    else
      render json: {
        status: "not logged in",
        logged_in: false
      }, status: 200
    end
  end

  def logout
    reset_session
    render json: {
      status: "logged out",
      logged_out: true
    }, status: 200
  end
end
