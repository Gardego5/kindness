-- Up

-- Fails, because timeslot 4 isn't on project 1.
INSERT INTO visits (date, timeslot_id, project_id) VALUES
('2022-11-30', 4, 1);

-- Fails, because visit 3 in for project 2, and user 2 is not in project 2.
INSERT INTO users_visits (user_id, visit_id) VALUES
(2, 3);

-- Down
