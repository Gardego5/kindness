import sql from "@lib/db";

const visit_id = (date, timeslot, project_id) =>
  sql`
    SELECT id
      FROM visits
     WHERE visits.timeslot_id =
           (SELECT id
              FROM timeslots
             WHERE timeslots.title = ${timeslot}
               AND timeslots.project_id = ${project_id})
       AND visits.date = ${date}`;

export const findVisits = async ({ filter = sql`` }) =>
  await sql`
    SELECT visits.date,
           timeslots.title as timeslot,
           COALESCE(JSON_AGG(
             JSON_BUILD_OBJECT(
               'username', users.username,
               'first_name', users.first_name,
               'last_name', users.last_name)
             ) FILTER (WHERE users.username IS NOT NULL), '[]') AS users
      FROM visits
      JOIN projects
        ON projects.id = visits.project_id
 LEFT JOIN users_visits
        ON users_visits.visit_id = visits.id
 LEFT JOIN users
        ON users.id = users_visits.user_id
 LEFT JOIN timeslots
        ON visits.timeslot_id = timeslots.id
     ${filter}
     GROUP BY visits.id, timeslots.title;`;

export const findVisitId = async ({ date, timeslot, project_id }) =>
  await sql`${visit_id(date, timeslot, project_id)};`;

export const addVisit = async ({ date, timeslot, project_id }) =>
  await sql`
    INSERT INTO visits (date, timeslot_id, project_id) VALUES
      (
        ${date},
        (SELECT id
           FROM timeslots
          WHERE timeslots.title = ${timeslot}
            AND timeslots.project_id = ${project_id}),
        ${project_id}
      );`;

export const findSignUpId = async ({ date, timeslot, project_id, username }) =>
  await sql`
    SELECT id
      FROM users_visits
     WHERE users_visits.visit_id =
           (${visit_id(date, timeslot, project_id)})
       AND users_visits.user_id =
           (SELECT id
              FROM users
             WHERE users.username = ${username});`;

export const addSignUp = async ({ date, timeslot, project_id, username }) =>
  await sql`
    INSERT INTO users_visits (
        user_id,
        visit_id
      ) VALUES (
        (SELECT id
           FROM users
          WHERE users.username = ${username}),
        (${visit_id(date, timeslot, project_id)})
      ) RETURNING *;`;

export const removeSignUp = async ({ date, timeslot, project_id, username }) =>
  await sql`
    DELETE FROM users_visits
     WHERE users_visits.user_id =
           (SELECT id
              FROM users
             WHERE users.username = ${username})
       AND users_visits.visit_id =
           (${visit_id(date, timeslot, project_id)});`;
