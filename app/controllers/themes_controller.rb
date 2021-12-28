class ThemesController < ApplicationController
  def change
    theme = params[:theme]
    cookies.permanent[:theme] = theme
    render plain: "Theme updated to " + theme + "!"
  end
end
