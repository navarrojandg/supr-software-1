import dotenv from "dotenv";
dotenv.config();

import IORedis from "ioredis";

const client = new IORedis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  maxRetriesPerRequest: null,
});

export default client;
