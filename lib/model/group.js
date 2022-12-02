import crypto from "crypto";
import sql from "@lib/db";
import makeError from "@lib/view/errorView";

export const findGroupById = async ({ id }) =>
  (
    await sql`
      SELECT groups.*,
             COALESCE(JSON_AGG(groups_projects.project_id)
                      FILTER (WHERE groups_projects.project_id IS NOT NULL),
                      '[]') AS project_ids
        FROM groups
        JOIN groups_projects
          ON groups.id = groups_projects.group_id
       WHERE groups.id = ${id}
       GROUP BY groups.id;`
  )[0];

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
    const [createdGroup] = await sql`
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

export const deleteGroup = async ({ id }) =>
  await sql`
    DELETE FROM groups
     WHERE id = ${id};`;

export const validateGroupPassword = async (group, inputPassword) => {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, group.salt, 1000, 64, "sha512")
    .toString("hex");

  const match = group.hash === inputHash;

  if (!match)
    throw makeError({
      message: "Invalid group password.",
      code: 403,
    });

  const active = await sql`
     SELECT CURRENT_DATE
    BETWEEN ${group.start_date ?? "1970-01-01"}
        AND ${group.end_date ?? "3000-01-01"};`;

  if (!active)
    throw makeError({
      message: "Invalid group id - expired.",
      code: 403,
    });

  return match;
};