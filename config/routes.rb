Rails.application.routes.draw do
  resources :registrations, only: [:create]
  resources :sessions, only: [:create]
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  resources :tasks, only: [:create, :destroy, :index, :show, :update]
  root 'homepage#index'
  # all invalid paths re-direct to root
  get '*path', to: 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
