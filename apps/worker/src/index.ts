import { Worker, Job } from "bullmq";

import { QUEUES } from "@repo/queues";
import redisClient from "./config/ioredis";

// Instantiate all the workers here
const espnWorker = new Worker(
  QUEUES.ESPN,
  async (job: Job) => {
    console.log("job.data", job.data);

    return;
  },
  { connection: redisClient }
);
