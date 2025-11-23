import IORedis from "ioredis";

const client = new IORedis({
  host: "redis",
  port: 6379,
  maxRetriesPerRequest: null,
});

export default client;
