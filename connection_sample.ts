import { createConnection } from "typeorm";

const database = createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "xxxx",
  password: "xxxxxxxx",
  database: "xxxx",
  entities: ["src/entity/*.ts"],
  synchronize: true,
});

export const mysql = database;
