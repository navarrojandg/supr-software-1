import dotenv from "dotenv";
dotenv.config();

import IORedis from "ioredis";

console.log(process.env.REDIS_HOST, process.env.REDIS_PORT);

const client = new IORedis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  maxRetriesPerRequest: null,
});

export default client;
