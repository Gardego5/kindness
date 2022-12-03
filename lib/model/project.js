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
 LEFT JOIN timeslots
        ON timeslots.project_id = projects.id
      JOIN users
        ON users_projects.user_id = users.id
     ${filter}
     GROUP BY projects.id;`;

export const addProjectSignUps = async ({ user_id, project_ids }) =>
  await sql`
    INSERT INTO users_projects (user_id, project_id) VALUES
    ${project_ids.map((project_id, idx, arr) => {
      console.log(
        `(${user_id}, ${project_id})${idx < arr.length - 1 ? "," : ""}`
      );
      return sql`(${user_id}, ${project_id})${
        idx < arr.length - 1 ? sql`,` : sql``
      }`;
    })} RETURNING *;`;
