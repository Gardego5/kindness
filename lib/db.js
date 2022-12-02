import postgres from "postgres";

const sql = postgres({
  host: "localhost",
  port: 5432,
  database: "kindness",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

export default sql;
