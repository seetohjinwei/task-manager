class AddPosidToTasks < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :posid, :bigint
  end
end
