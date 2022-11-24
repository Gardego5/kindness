import sql from "@lib/db";

const findVisits = async ({ filter = sql`` }) =>
  await sql`
    SELECT visits.date,
           timeslots.title as timeslot,
           JSON_AGG(JSON_BUILD_OBJECT('username', users.username, 'first_name', users.first_name, 'last_name', users.last_name)) as users
      FROM visits
      JOIN projects
        ON projects.id = visits.project_id
 FULL JOIN users_visits
        ON users_visits.visit_id = visits.id
 FULL JOIN users
        ON users.id = users_visits.user_id
      JOIN timeslots
        ON visits.timeslot_id = timeslots.id
     ${filter}
     GROUP BY visits.id, timeslots.title;`;

export default findVisits;
