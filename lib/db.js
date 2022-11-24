import postgres from "postgres";

const sql = postgres({
  host: "localhost",
  port: 5432,
  database: "kindness",
});

export default sql;
