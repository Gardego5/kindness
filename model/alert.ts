import sql from "@lib/db";

const selectAlertView = sql`
    SELECT alerts.location,
           alerts.content,
           alerts.yes,
           alerts.no,
           COALESCE(JSON_AGG(DISTINCT alerts_users.user_id)
                    FILTER (WHERE alerts_users.user_id IS NOT NULL),
                    '[]') AS user_ids,
           COALESCE(JSON_AGG(DISTINCT alerts_groups.group_id)
                    FILTER (WHERE alerts_groups.group_id IS NOT NULL),
                    '[]') AS group_ids,
           COALESCE(JSON_AGG(DISTINCT alerts_projects.project_id)
                    FILTER (WHERE alerts_projects.project_id IS NOT NULL),
                    '[]') AS project_ids
      FROM alerts
 LEFT JOIN alerts_users
        ON alerts.id = alerts_users.alert_id
 LEFT JOIN alerts_groups
        ON alerts.id = alerts_groups.alert_id
 LEFT JOIN alerts_projects
        ON alerts.id = alerts_projects.alert_id
 LEFT JOIN users
        ON alerts.creator_id = users.id`;

export const findAlert = async ({ filters }) =>
  await sql<AlertView[]>`${selectAlertView} ${filters} GROUP BY alerts.id;`;

export const findUserAlerts = async ({ id }: DB_User) =>
  await sql<AlertView[]>`
    ${selectAlertView}
 LEFT JOIN users_groups
        ON users_groups.user_id = users.id
 LEFT JOIN users_projects
        ON users_projects.user_id = users.id
     WHERE users.id = ${id}
       AND (alerts_users.user_id IS NULL
        OR  alerts_users.user_id = users.id)
       AND (alerts_groups.group_id IS NULL
        OR  alerts_groups.group_id = users_groups.group_id)
       AND (alerts_projects.project_id IS NULL
        OR  alerts_projects.project_id = users_projects.project_id)
       AND ((alerts.start_date IS NULL AND alerts.end_date IS NULL)
        OR  (alerts.start_date IS NULL AND alerts.end_date IS NOT NULL AND (SELECT CURRENT_DATE < alerts.end_date))
        OR  (alerts.start_date IS NOT NULL AND alerts.end_date IS NULL AND (SELECT CURRENT_DATE > alerts.start_date))
        OR  (SELECT CURRENT_DATE BETWEEN alerts.start_date AND alerts.end_date))
     GROUP BY alerts.id;`;

export const addAlert = async ({
  location,
  content,
  start_date,
  end_date,
  displays,
  creator_id,
  yes,
  no,
}: {
  location: alertPlacement;
  content: string;
  start_date?: postgresDate;
  end_date?: postgresDate;
  displays?: number;
  creator_id?: number;
  yes?: string;
  no?: string;
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
      ${typeof yes !== "undefined" ? sql`, yes` : sql``}
      ${typeof no !== "undefined" ? sql`, no` : sql``}
    ) VALUES (
      ${location},
      ${content}
      ${typeof start_date !== "undefined" ? sql`, ${start_date}` : sql``}
      ${typeof end_date !== "undefined" ? sql`, ${end_date}` : sql``}
      ${typeof displays !== "undefined" ? sql`, ${displays}` : sql``}
      ${typeof creator_id !== "undefined" ? sql`, ${creator_id}` : sql``}
      ${typeof yes !== "undefined" ? sql`, ${yes}` : sql``}
      ${typeof no !== "undefined" ? sql`, ${no}` : sql``}
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
