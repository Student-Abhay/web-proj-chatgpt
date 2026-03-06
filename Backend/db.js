import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Abhay@1234",
  database: "inventory_saas",
});

export default pool;