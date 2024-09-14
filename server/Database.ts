import { DataSource } from "typeorm";
import { Todo } from "./entities/Todo";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "alexander",
  password: "abc123",
  database: "mydatabase",
  synchronize: true,
  logging: true,
  entities: [Todo],
});
