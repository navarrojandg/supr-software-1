import "reflect-metadata";

import dotenv from "dotenv";
dotenv.config();

import { DataSource } from "typeorm";
import { Athlete } from "./entity/Athlete";

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: true,
  entities: [Athlete],
  subscribers: [],
  migrations: [],
});
