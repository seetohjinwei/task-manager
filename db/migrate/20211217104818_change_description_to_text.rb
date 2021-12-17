class ChangeDescriptionToText < ActiveRecord::Migration[6.1]
  def change
    remove_column :tasks, :description
    add_column :tasks, :description, :text
    #Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
