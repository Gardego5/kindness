import sql from "@lib/db";

export const findProjects = async ({ filter = sql`` }) =>
  await sql`
    SELECT projects.id,
           projects.name,
           projects.start_date,
           projects.end_date,
           JSON_AGG(timeslots.title) as timeslots FROM projects
      JOIN users_projects
        ON users_projects.project_id = projects.id
      JOIN timeslots
        ON timeslots.project_id = projects.id
      JOIN users
        ON users_projects.user_id = users.id
     ${filter}
     GROUP BY projects.id;`;
