import sql from "@lib/db";

export const findProjects = async ({ filter = sql`` }) =>
  await sql<ProjectView[]>`
    SELECT projects.id,
           projects.name,
           projects.start_date,
           projects.end_date,
           projects.recipient_id,
           COALESCE(JSON_AGG(timeslots.title)
                      FILTER (WHERE timeslots.title IS NOT NULL),
                      '[]') AS timeslots
      FROM projects
 LEFT JOIN users_projects
        ON users_projects.project_id = projects.id
 LEFT JOIN timeslots
        ON timeslots.project_id = projects.id
 LEFT JOIN users
        ON users_projects.user_id = users.id
     ${filter}
     GROUP BY projects.id;`;

export const addProjectSignUps = async ({
  user_id,
  project_ids,
}: {
  user_id: number;
  project_ids: number[];
}) =>
  await sql<DBJoin.Users_Projects[]>`
    INSERT INTO users_projects (user_id, project_id) VALUES
    ${project_ids.reduce(
      (previous, project_id, idx, arr) =>
        sql`${previous}
          (
            ${user_id},
            ${project_id}
          )${idx < arr.length - 1 ? sql`,` : sql``}`,
      sql``
    )} RETURNING *;`;
