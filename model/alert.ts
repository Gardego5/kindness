import sql from "@lib/db";

export const findAlert = async ({ filters }) =>
  await sql`
    SELECT alerts.location,
           alerts.content,
           alerts_users.user_id,
           alerts_groups.group_id,
           alerts_projects.project_id
      FROM alerts
 LEFT JOIN alerts_users
        ON alerts.id = alerts_users.alert_id
 LEFT JOIN alerts_groups
        ON alerts.id = alerts_groups.alert_id
 LEFT JOIN alerts_projects
        ON alerts.id = alerts_projects.alert_id
 LEFT JOIN users
        ON alerts.creator_id = users.id
      ${filters};`;

export const addAlert = async ({
  location,
  content,
  start_date,
  end_date,
  displays,
  creator_id,
}) =>
  (
    await sql<DB_Alert[]>`
    INSERT INTO alerts (
      location,
      content
      ${typeof start_date !== "undefined" ? sql`, start_date` : sql``}
      ${typeof end_date !== "undefined" ? sql`, end_date` : sql``}
      ${typeof displays !== "undefined" ? sql`, displays` : sql``}
      ${typeof creator_id !== "undefined" ? sql`, creator_id` : sql``}
    ) VALUES (
      ${location},
      ${content}
      ${typeof start_date !== "undefined" ? sql`, ${start_date}` : sql``}
      ${typeof end_date !== "undefined" ? sql`, ${end_date}` : sql``}
      ${typeof displays !== "undefined" ? sql`, ${displays}` : sql``}
      ${typeof creator_id !== "undefined" ? sql`, ${creator_id}` : sql``}
    ) RETURNING *;`
  )[0];

export const addAlertProjects = async ({
  alert_id,
  project_ids,
}: {
  alert_id: number;
  project_ids: number[];
}) =>
  (
    await sql<DBJoin.Alerts_Projects[]>`
    INSERT INTO alerts_projects (
      alert_id,
      project_id
    ) VALUES 
      ${project_ids.reduce(
        (previous, project_id, idx, { length }) =>
          sql`${previous}
          (
            ${alert_id},
            ${project_id}
          )${idx < length - 1 ? sql`,` : sql``}`,
        sql``
      )}
    RETURNING *;`
  ).map(({ project_id }) => project_id);

export const addAlertGroups = async ({
  alert_id,
  group_ids,
}: {
  alert_id: number;
  group_ids: string[];
}) =>
  (
    await sql<DBJoin.Alerts_Groups[]>`
    INSERT INTO alerts_groups (
      alert_id,
      group_id
    ) VALUES 
      ${group_ids.reduce(
        (previous, group_id, idx, { length }) =>
          sql`${previous}
          (
            ${alert_id},
            ${group_id}
          )${idx < length - 1 ? sql`,` : sql``}`,
        sql``
      )}
    RETURNING *;`
  ).map(({ group_id }) => group_id);

export const addAlertUsers = async ({
  alert_id,
  user_ids,
}: {
  alert_id: number;
  user_ids: number[];
}) =>
  (
    await sql<DBJoin.Alerts_Users[]>`
    INSERT INTO alerts_users (
      alert_id,
      user_id
    ) VALUES 
      ${user_ids.reduce(
        (previous, user_id, idx, { length }) =>
          sql`${previous}
          (
            ${alert_id},
            ${user_id}
          )${idx < length - 1 ? sql`,` : sql``}`,
        sql``
      )}
    RETURNING *;`
  ).map(({ user_id }) => user_id);
