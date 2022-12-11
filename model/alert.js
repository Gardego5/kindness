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
  await sql`
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
    ) RETURNING *;`;
