class AddSearchOptionsToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :display_done, :boolean
    add_column :users, :strict_search, :boolean
    add_column :users, :sort_method, :string
    User.update_all(display_done: true)
    User.update_all(strict_search: false)
    User.update_all(sort_method: "default")
  end
end
