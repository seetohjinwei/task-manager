# Jin Wei's Task Manager

Yet another task manager, built with React and Ruby on Rails.

Sign up for an account to manage your tasks now!

<a href="https://jinwei-task-manager.herokuapp.com/">Link to Task Manager</a>

NOTE: Heroku "sleeps" applications when they are inactive for more than 30 minutes. So, chances are that when you fire up this web application, it is sleeping. Do give it some time (around 5 seconds-ish) to wake up. However, once the application is woken up, it will be very snappy!

## User Manual

<a href="https://github.com/seetohjinwei/Task-Manager/blob/master/user_manual/User Manual.pdf">PDF version here.</a>

### Login

Enter your username and password and press login.

Press on "Sign up instead!" to navigate to the signup page instead.

![login](./user_manual/images/default_login.png)

### Sign Up

Enter your desired username and password twice and press login.

Press on "Login instead!" to navigate to the login page instead.

![signup](./user_manual/images/default_signup.png)

### Dashboard

You will be re-directed here after successful login/signup.

![dashboard](./user_manual/images/default_dashboard.png)

### Adding a Task

Press the "Add Task" button to add a task. You will see the following window.

To save the task, fill up the form and press on "Save". The task will be added to the end.

To cancel, press on the cross on the top right. Note that this will not save the task.

![add_task_1](./user_manual/images/add_task_1.png)
![add_task_2](./user_manual/images/add_task_2.png)
![add_task_3](./user_manual/images/add_task_3.png)
![add_task_4](./user_manual/images/add_task_4.png)

### Re-arranging Tasks

Tasks in "Default" sort can be re-arranged by dragging the dots above each task. Simply move it to the desired position and release your mouse or finger.

### Sorting Tasks

Alphabetical Sort
![sort_alphabetical](./user_manual/images/sort_alphabetical.png)

Deadline Sort -- The tasks without deadline will be at the back.
![sort_deadline](./user_manual/images/sort_deadline.png)

### Editing Tasks

Click on the task name to bring up a focused view of the task. From here, you can edit the fields by simply clicking on the fields to be edited. For example, by clicking on the description.

![task_modal](./user_manual/images/task_modal.png)
![task_modal_editing](./user_manual/images/task_modal_editing.png)
![task_modal_edited](./user_manual/images/task_modal_edited.png)

### Settings

Here you can configure certain defaults.

You can change the default sort, default behaviour of showing finished tasks, default behaviour of matching all search terms. These 3 settings are tied to the user account.

You can also change the theme. This is stored as a cookie and is tied to the browser and not the user account.

You must press on "Save Changes" in order to save the changes made.

You can also change your account password.

![settings](./user_manual/images/default_settings.png)

### Themes

Currently, the available themes are "default", "dark" and "cyberpunk".

You can change your theme in the user settings.

You can change your theme without logging in by visiting this URL (replace default with the theme of your choice, case-sensitive): `http://jinwei-task-manager.herokuapp.com/change_theme?theme=default` or by changing the cookie in your browser labelled `theme`.

![change_theme](./user_manual/images/change_theme.png)

#### Dark Theme

![dark_login](./user_manual/images/dark_login.png)
![dark_dashboard](./user_manual/images/dark_dashboard.png)
![dark_settings](./user_manual/images/dark_settings.png)

#### Cyberpunk Theme

![cyberpunk_login](./user_manual/images/cyberpunk_login.png)
![cyberpunk_dashboard](./user_manual/images/cyberpunk_dashboard.png)
![cyberpunk_settings](./user_manual/images/cyberpunk_settings.png)
