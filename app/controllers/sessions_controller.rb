class SessionsController < ApplicationController
  include CurrentUserConcern

  def create
    # params is sent by frontend
    user = User
      .find_by(username: params["user"]["username"])
      .try(:authenticate, params["user"]["password"])
    if user
      # storing in cookie if login successful
      session[:user_id] = user.id
      render json: {
        status: :created,
        user: user
      }
    else
      # failed to login
      render json: {
        # HTTP unauthorised code
        status: 401
      }
    end
  end

  def logged_in
    if @current_user
      render json: {
        logged_in: true,
        user: @current_user
      }
    else
      render json: {
        logged_in: false
      }
    end
  end

  def logout
    reset_session
    render json: {
      # HTTP request successful
      status: 200,
      logged_out: true
    }
  end
end
