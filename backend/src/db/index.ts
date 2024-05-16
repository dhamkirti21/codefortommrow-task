import { createPool } from "mysql2";

const pool = createPool({
  host: "localhost",
  user:"root",
  password:"12345",
  database:"CODETOMMOROW"
}).promise();


export default pool;



