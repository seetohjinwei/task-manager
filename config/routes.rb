Rails.application.routes.draw do
  resources :registrations, only: [:create]
  resources :sessions, only: [:create]
  delete :logout, to: 'sessions#logout'
  get :logged_in, to: 'sessions#logged_in'
  patch :change_password, to: 'users#change_password'
  patch :search_options, to: 'users#search_options'
  resources :tasks, only: [:create, :destroy, :index, :show, :update]
  delete :delete_finished, to: 'tasks#delete_finished'
  get :change_theme, to: 'themes#change'
  root 'homepage#index'
  get '/dashboard', to: 'homepage#dashboard'
  get '/settings', to: 'homepage#settings'
  # all invalid paths re-direct to root
  get '*path', to: 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
