import dotenv from "dotenv";
import mariadb, { ConnectionOptions } from "mysql2";

dotenv.config();

const connectionOptions: ConnectionOptions = {
  user: process.env.MARIADB_USER,
  host: process.env.MARIADB_HOST,
  password: process.env.MARIADB_PASSWORD,
  port: 3306,
  database: "todo",
  dateStrings: true,
};

export const connection = mariadb.createConnection(connectionOptions);
