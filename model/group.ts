import crypto from "crypto";
import sql from "@lib/db";
import HTMLClientError from "@lib/HTMLResponseStatusCodes/400";

export const findGroupById = async ({ id }) =>
  (
    await sql<(DB_Group & { project_ids: number[] })[]>`
      SELECT groups.*,
             COALESCE(JSON_AGG(groups_projects.project_id)
                      FILTER (WHERE groups_projects.project_id IS NOT NULL),
                      '[]') AS project_ids
        FROM groups
   LEFT JOIN groups_projects
          ON groups.id = groups_projects.group_id
       WHERE groups.id = ${id}
       GROUP BY groups.id;`
  )[0];

export const getAllGroups = async () =>
  await sql<GroupView[]>`
    SELECT groups.id,
           name,
           start_date,
           end_date,
           JSON_AGG(groups_projects.project_id) as project_ids
      FROM groups
 LEFT JOIN groups_projects
        ON groups.id = groups_projects.group_id
  GROUP BY groups.id;`;

export const createGroup = async ({
  name = null,
  password,
  start_date = null,
  end_date = null,
}) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  const group = {
    name,
    salt,
    hash,
    start_date,
    end_date,
  };

  try {
    const [createdGroup] = await sql<DB_Group[]>`
      INSERT INTO groups (
        "name",
        "salt",
        "hash",
        "start_date",
        "end_date"
      ) VALUES (
        ${group.name},
        ${group.salt},
        ${group.hash},
        ${group.start_date},
        ${group.end_date}
      ) RETURNING *;`;

    return createdGroup;
  } catch (error) {
    console.log(`Error creating group:`);
    console.error(error);
  }
};

export const deleteGroup = async ({ id }) => {
  await sql`
    DELETE FROM groups
     WHERE id = ${id};`;
};

export const validateGroupPassword = async (
  group: DB_Group,
  inputPassword: string
) => {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, group.salt, 1000, 64, "sha512")
    .toString("hex");

  const match = group.hash === inputHash;

  if (!match)
    throw new HTMLClientError.FORBIDDEN_403("Invalid group password.");

  const [active] = await sql`
     SELECT CURRENT_DATE
    BETWEEN ${group.start_date ?? "1970-01-01"}
        AND ${group.end_date ?? "3000-01-01"};`;

  if (!active)
    throw new HTMLClientError.FORBIDDEN_403("Invalid group id - expired");

  if (group.signup_disabled)
    throw new HTMLClientError.FORBIDDEN_403("Invalid group id.");

  return match;
};

export const addUserToGroup = async ({
  user_id,
  group_id,
}: {
  user_id: number;
  group_id: string;
}) =>
  await sql<DBJoin.Users_Groups[]>`
    INSERT INTO users_groups (
      user_id,
      group_id
    ) VALUES (
      ${user_id},
      ${group_id}
    ) RETURNING *;`;

export const addProjectsToGroup = async ({
  project_ids,
  group_id,
}: {
  project_ids: number[];
  group_id: string;
}) =>
  await sql<DBJoin.Groups_Projects[]>`
    INSERT INTO groups_projects (
      group_id,
      project_id
    ) VALUES
      ${project_ids.reduce(
        (previous, project_id, idx, { length }) =>
          sql`${previous}
            (
              ${group_id},
              ${project_id}
            )${idx < length - 1 ? sql`,` : sql``}`,
        sql``
      )}
    RETURNING *;`;
