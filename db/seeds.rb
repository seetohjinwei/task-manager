# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!([
  {
    username: "ABCDEFG",
    password: "ABCDEFG",
    password_confirmation: "ABCDEFG" 
  },
  {
    username: "admin",
    password: "password",
    password_confirmation: "password"
  }
])

Task.create!(
  name: "Task 1",
  description: "Hello world!",
  deadline: "",
  isdone: false,
  tags: ["personal"],
  user: User.first
)
Task.create!(
  name: "Steal Christmas",
  description: "Hohoho!",
  deadline: "211225",
  isdone: false,
  tags: ["holidays"],
  user: User.first
)
Task.create!(
  name: "Finish this task manager!",
  description: "Hopefully sooner rather than later!",
  deadline: "",
  isdone: false,
  tags: ["assignments"],
  user: User.first
)
Task.create!(
  name: "Find the answer to the problem.",
  description: "",
  deadline: "",
  isdone: true,
  tags: ["random"],
  user: User.first
)
Task.create!(
  name: "Lorem Ipsum",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  deadline: "",
  isdone: false,
  tags: ["lorem ipsum"],
  user: User.first
)
Task.create!(
  name: "Another generic task",
  description: "",
  deadline: "",
  isdone: false,
  tags: [],
  user: User.first
)
Task.create!(
  name: "Last 1 i promise",
  description: "number 7",
  deadline: "",
  isdone: true,
  tags: [],
  user: User.first
)

Task.create!(
  name: "admin task",
  description: "admin desc",
  deadline: "",
  isdone: true,
  tags: ["admin"],
  user: User.second
)
