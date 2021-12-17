class TasksController < ApplicationController
  # GET request
  def index
    @tasks = Task.all.filter{ |t| t[:user_id] == session[:user_id] }
    if @tasks
      render json: {
        status: 200,
        tasks: @tasks
      }
    else
      render json: {
        status: 401
      }
    end
  end

  # individual task
  # /tasks/5
  def show
    task = Task.find(params[:id])
    if session[:user_id] != task[:user_id]
      render json: {
        status: 401 # not authorized
      }
    elsif task
      render json: {
        status: 200, # success
        task: task
      }
    else
      render json: {
        status: 401 # not authorized
      }
    end
  end

  # POST request
  def create
    user = User.find(session[:user_id])
    task = Task.create!(
      name: params["name"],
      description: params["description"],
      deadline: params["deadline"],
      isdone: params["isdone"],
      tags: params["tags"],
      user: user
    )
    if task
      render json: {
        status: "success",
        task: task
      }, status: 200
    else
      render json: {
        status: "internal server error"
      }, status: 500
    end
  end

  # PATCH request (don't use PUT -- deprecated)
  def update
    user = User.find(session[:user_id])
    task = Task.find(params[:id])
    done = task.update(
      name: params["name"],
      description: params["description"],
      deadline: params["deadline"],
      isdone: params["isdone"],
      tags: params["tags"],
      user: user
    )
    if done
      render json: {
        status: "success",
        task: task
      }, status: 200
    else
      render json: {
        status: "internal server error"
      }, status: 500
    end
  end

  # DELETE request
  def destroy
    task = Task.find(params[:id])
    if session[:user_id] != task[:user_id]
      render json: {
        status: "not authorized"
      }, status: 401
      elsif task.destroy
      render json: {
        status: "success"
      }, status: 200
    else
      render json: {
        status: "internal server error"
      }, status: 500
    end
  end
end
