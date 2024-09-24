import { DataSource } from "typeorm";
import { Todo } from "../models/Todo";
import * as dotenv from "dotenv";
import {join} from "path";

dotenv.config({ path: join(__dirname, "../.env") });
console.log(process.env.DB_DATABASE);


export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [Todo],
  ssl: {
    rejectUnauthorized: false,
  }
});
