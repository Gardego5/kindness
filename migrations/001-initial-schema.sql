-- Up

CREATE TABLE users (
  "id"                  SERIAL PRIMARY KEY,
  "username"            TEXT NOT NULL UNIQUE,
  "email"               TEXT NOT NULL UNIQUE,
  "hash"                TEXT NOT NULL,
  "salt"                TEXT NOT NULL,
  "first_name"          TEXT NOT NULL,
  "last_name"           TEXT NOT NULL
);

CREATE TABLE projects (
  "id"                  SERIAL PRIMARY KEY,
  "name"                TEXT NOT NULL,
  "start_date"          DATE NOT NULL,
  "end_date"            DATE
);

CREATE TABLE timeslots (
  "id"                  SERIAL PRIMARY KEY,
  "title"               TEXT NOT NULL,
  "project_id"          INTEGER NOT NULL,
  CONSTRAINT FK_Timeslot_Project
    FOREIGN KEY (project_id) REFERENCES projects (id)
);

CREATE FUNCTION timeslotAndVisitProjectMatch (
  project_id            INTEGER,
  timeslot_id           INTEGER
) RETURNS BOOLEAN AS
$$
  SELECT CASE WHEN
    EXISTS (SELECT * FROM timeslots
             WHERE timeslots.project_id = project_id
               AND timeslots.id = timeslot_id)
    THEN TRUE
    ELSE FALSE
  END
$$ LANGUAGE SQL;

CREATE TABLE visits (
  "id"                  SERIAL PRIMARY KEY,
  "date"                DATE NOT NULL,
  "hidden"              BOOLEAN DEFAULT false NOT NULL,
  "timeslot_id"         INTEGER NOT NULL,
  "project_id"          INTEGER NOT NULL,
  CONSTRAINT FK_Visit_Timeslot
    FOREIGN KEY (timeslot_id) REFERENCES timeslots (id),
  CONSTRAINT FK_Visit_Project
    FOREIGN KEY (project_id) REFERENCES projects (id),
  CONSTRAINT Timeslot_And_Visit_Project_Match
    CHECK (timeslotAndVisitProjectMatch(project_id, timeslot_id) = TRUE)
);

CREATE TABLE users_projects (
  "id"                  SERIAL PRIMARY KEY,
  "user_id"             INTEGER NOT NULL,
  "project_id"          INTEGER NOT NULL,
  CONSTRAINT FK_Users_Projects
    FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT FK_Projects_Users
    FOREIGN KEY (project_id) REFERENCES projects (id)
);

CREATE FUNCTION usersVisitsInTheirProjects (
  user_id               INTEGER,
  visit_id              INTEGER
) RETURNS BOOLEAN AS
$$
  SELECT CASE WHEN
    EXISTS (SELECT * FROM visits
              JOIN users_projects
                ON users_projects.project_id = visits.project_id
             WHERE users_projects.user_id = user_id
               AND visits.id = visit_id)
    THEN TRUE
    ELSE FALSE
  END
$$ LANGUAGE SQL;

CREATE TABLE users_visits (
  "id"                  SERIAL PRIMARY KEY,
  "user_id"             INTEGER NOT NULL,
  "visit_id"            INTEGER NOT NULL,
  CONSTRAINT FK_Users_Visits
    FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT FK_Visits_Users
    FOREIGN KEY (visit_id) REFERENCES visits (id),
  CONSTRAINT Users_Visits_In_Their_Projects
    CHECK (usersVisitsInTheirProjects(user_id, visit_id) = TRUE)
);

-- Down

DROP TABLE              users_visits;
DROP FUNCTION           usersVisitsInTheirProjects(INTEGER, INTEGER);
DROP TABLE              users_projects;
DROP TABLE              visits;
DROP FUNCTION           timeslotAndVisitProjectMatch(INTEGER, INTEGER);
DROP TABLE              timeslots;
DROP TABLE              projects;
DROP TABLE              users;
