class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :name
      t.string :description
      t.string :tags
      t.string :deadline
      t.boolean :isdone
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
