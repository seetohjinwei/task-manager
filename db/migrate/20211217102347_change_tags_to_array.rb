class ChangeTagsToArray < ActiveRecord::Migration[6.1]
  def change
    remove_column :tasks, :tags
    add_column :tasks, :tags, :string, array: true, default: []
  end
end
