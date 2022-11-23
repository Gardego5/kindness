import sql from "@lib/db";

export const findProjectsByUser = async (user) => {
  const projects = await sql`
  SELECT * FROM projects
    JOIN users_projects
      ON users_projects.project_id = projects.id
    JOIN timeslots
      ON timeslots.project_id = projects.id
    JOIN users
      ON users_projects.user_id = users.id
   WHERE users.username = ${user.username};`;

  return projects;
};
