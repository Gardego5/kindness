import crypto from "crypto";
import sql from "@lib/db";
import userView from "@lib/view/user";

export async function createUser({
  username,
  email,
  password,
  first_name,
  last_name,
}) {
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  const user = {
    username,
    email,
    salt,
    hash,
    first_name,
    last_name,
  };

  try {
    const db_response = await sql`
      INSERT INTO users ("username", "email", "salt", "hash", "first_name", "last_name")
      VALUES (${user.username}, ${user.email}, ${user.salt}, ${user.hash}, ${user.first_name}, ${user.last_name});`;

    return userView(user);
  } catch (error) {
    console.log(`Error creating user:`);
    console.error(error);
  }
}

export const findUser = async ({ username }) => {
  const [user] = await sql`
  SELECT * FROM users
   WHERE username = ${username}`;

  return user;
};

export const findUsers = async ({ filter = sql`` }) =>
  await sql`
    SELECT * FROM users
      ${filter};`;

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512")
    .toString("hex");

  return user.hash === inputHash;
}