class UsersController < ApplicationController
  include CurrentUserConcern

  # PATCH request to change password
  def change_password
    if not @current_user
      # not logged in
      render json: {
        user: @current_user,
        status: "not authorized/not logged in"
      }, status: 401
    else
      # verify old_password against database
      verify = @current_user.authenticate(params[:old_password])
      if verify
        # if old_password is correct
        if params[:password] != params[:password_confirmation]
          # double check password == password_confirmation
          # also checked in frontend
          render json: {
            status: "Passwords do not match!"
          }, status: 401
        else
          # if everything is fine, run this
          @current_user.password = params[:password]
          @current_user.password_confirmation = params[:password_confirmation]
          @current_user.save
          render json: {
            status: "success",
            user: @current_user
          }, status: 200
        end
      else
        # old_password is wrong
        render json: {
          status: "Wrong Password!"
        }, status: 401
      end
    end
  end

  # PATCH request to update search params
  def search_options
    done = @current_user.update(search_params)
    if done
      render json: {
        status: "success",
        user: @current_user
      }, status: 200
    else
      render json: {
        status: "internal server error"
      }, status: 500
    end
  end

  private

  def search_params
    params.require(:user).permit(:display_done, :strict_search, :sort_method)
  end
end
