-- Up

CREATE TABLE users (
  "id"                  SERIAL PRIMARY KEY,
  "username"            TEXT NOT NULL UNIQUE,
  "email"               TEXT NOT NULL UNIQUE,
  "hash"                TEXT NOT NULL,
  "salt"                TEXT NOT NULL,
  "first_name"          TEXT NOT NULL,
  "last_name"           TEXT NOT NULL,
  "is_admin"            BOOLEAN DEFAULT false NOT NULL
);

CREATE TABLE projects (
  "id"                  SERIAL PRIMARY KEY,
  "name"                TEXT NOT NULL,
  "start_date"          DATE NOT NULL,
  "end_date"            DATE,
  "recipient_id"        INTEGER,
  CONSTRAINT FK_Projects_Recipient
    FOREIGN KEY (recipient_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE timeslots (
  "id"                  SERIAL PRIMARY KEY,
  "title"               TEXT NOT NULL,
  "project_id"          INTEGER NOT NULL,
  CONSTRAINT FK_Timeslots_Project
    FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
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
  CONSTRAINT FK_Visits_Timeslot
    FOREIGN KEY (timeslot_id) REFERENCES timeslots (id) ON DELETE CASCADE,
  CONSTRAINT FK_Visits_Project
    FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE,
  CONSTRAINT Timeslot_And_Visit_Project_Match
    CHECK (timeslotAndVisitProjectMatch(project_id, timeslot_id) = TRUE)
);

CREATE TABLE users_projects (
  "id"                  SERIAL PRIMARY KEY,
  "user_id"             INTEGER NOT NULL,
  "project_id"          INTEGER NOT NULL,
  CONSTRAINT FK_Users_Projects
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT FK_Projects_Users
    FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
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
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT FK_Visits_Users
    FOREIGN KEY (visit_id) REFERENCES visits (id) ON DELETE CASCADE,
  CONSTRAINT Users_Visits_In_Their_Projects
    CHECK (usersVisitsInTheirProjects(user_id, visit_id) = TRUE)
);

CREATE TABLE groups (
  "id"                  UUID DEFAULT GEN_RANDOM_UUID() PRIMARY KEY,
  "name"                TEXT,
  "hash"                TEXT NOT NULL,
  "salt"                TEXT NOT NULL,
  "start_date"          DATE,
  "end_date"            DATE
);

CREATE TABLE groups_projects (
  "id"                  SERIAL PRIMARY KEY,
  "group_id"            UUID NOT NULL,
  "project_id"          INTEGER NOT NULL,
  CONSTRAINT FK_Groups_Projects
    FOREIGN KEY (group_id) REFERENCES groups (id) ON DELETE CASCADE,
  CONSTRAINT FK_Projects_Groups
    FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
);

CREATE TABLE users_groups (
  "id"                  SERIAL PRIMARY KEY,
  "user_id"             INTEGER NOT NULL,
  "group_id"            UUID NOT NULL,
  CONSTRAINT FK_Users_Groups
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT FK_Groups_Users
    FOREIGN KEY (group_id) REFERENCES groups (id) ON DELETE CASCADE
);

CREATE TYPE alert_placement
    AS ENUM (
      'login',
      'project',
      'signup'
    );

CREATE TABLE alerts (
  "id"                  SERIAL PRIMARY KEY,
  "location"            alert_placement NOT NULL,
  "content"             TEXT NOT NULL,
  "start_date"          DATE,
  "end_date"            DATE,
  "times_to_display"    INTEGER
);

CREATE TABLE alerts_users (
  "id"                  SERIAL PRIMARY KEY,
  "alert_id"            INTEGER NOT NULL,
  "user_id"             INTEGER NOT NULL,
  CONSTRAINT FK_Alerts_Users
    FOREIGN KEY (alert_id) REFERENCES alerts (id) ON DELETE CASCADE,
  CONSTRAINT FK_Users_Alerts
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE alerts_groups (
  "id"                  SERIAL PRIMARY KEY,
  "alert_id"            INTEGER NOT NULL,
  "group_id"            UUID NOT NULL,
  CONSTRAINT FK_Alerts_Groups
    FOREIGN KEY (alert_id) REFERENCES alerts (id) ON DELETE CASCADE,
  CONSTRAINT FK_Groups_Alerts
    FOREIGN KEY (group_id) REFERENCES groups (id) ON DELETE CASCADE
);

CREATE TABLE alerts_projects (
  "id"                  SERIAL PRIMARY KEY,
  "alert_id"            INTEGER NOT NULL,
  "project_id"          INTEGER NOT NULL,
  CONSTRAINT FK_Alerts_Projects
    FOREIGN KEY (alert_id) REFERENCES alerts (id) ON DELETE CASCADE,
  CONSTRAINT FK_Projects_Alerts
    FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
);

-- Down

DROP TABLE IF EXISTS    alerts_projects;
DROP TABLE IF EXISTS    alerts_groups;
DROP TABLE IF EXISTS    alerts_users;
DROP TABLE IF EXISTS    alerts;
DROP TYPE IF EXISTS     alert_placement;
DROP TABLE IF EXISTS    users_groups;
DROP TABLE IF EXISTS    groups_projects;
DROP TABLE IF EXISTS    groups;
DROP TABLE IF EXISTS    users_visits;
DROP FUNCTION IF EXISTS usersVisitsInTheirProjects(INTEGER, INTEGER);
DROP TABLE IF EXISTS    users_projects;
DROP TABLE IF EXISTS    visits;
DROP FUNCTION IF EXISTS timeslotAndVisitProjectMatch(INTEGER, INTEGER);
DROP TABLE IF EXISTS    timeslots;
DROP TABLE IF EXISTS    projects;
DROP TABLE IF EXISTS    users;
