-- Up

-- Projects by User
SELECT name, start_date, end_date FROM users
  JOIN users_projects
    ON users.id = users_projects.user_id
  JOIN projects
    ON users_projects.project_id = projects.id
 WHERE users.username = 'Gardego5';

-- Projects and Timeslots
SELECT * FROM projects
  JOIN timeslots
    ON timeslots.project_id = projects.id
 WHERE projects.name = 'Barbara Lloyd';

-- Down
