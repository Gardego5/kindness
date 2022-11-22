-- Up

CREATE TABLE users (
  "id" SERIAL PRIMARY KEY,
  "username" TEXT NOT NULL UNIQUE,
  "email" TEXT NOT NULL UNIQUE,
  "hash" TEXT NOT NULL,
  "salt" TEXT NOT NULL,
  "first_name" TEXT NOT NULL,
  "last_name" TEXT NOT NULL
);

CREATE TABLE projects (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "start_date" DATE NOT NULL
);

CREATE TABLE timeslots (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "project_id" INTEGER NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects (id)
);

CREATE TABLE visits (
  "id" SERIAL PRIMARY KEY,
  "date" DATE NOT NULL,
  "hidden" BOOLEAN DEFAULT false NOT NULL,
  "timeslot_id" INTEGER NOT NULL,
  "project_id" INTEGER NOT NULL,
  FOREIGN KEY (timeslot_id) REFERENCES timeslots (id),
  FOREIGN KEY (project_id) REFERENCES projects (id)
);

CREATE TABLE users_projects (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "project_id" INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (project_id) REFERENCES projects (id)
);

CREATE TABLE users_visits (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "visit_id" INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (visit_id) REFERENCES visits (id)
);

-- Down

DROP TABLE users_visits;
DROP TABLE users_projects;
DROP TABLE visits;
DROP TABLE timeslots;
DROP TABLE projects;
DROP TABLE users;
