import { Worker, Job } from "bullmq";

import { QUEUES } from "@repo/queues";
import redisClient from "./config/ioredis";
import { refreshNflRoster } from "./espn";

// Instantiate all the workers here
const espnRefreshNflRostersWorker = new Worker(
  QUEUES.ESPN_REFRESH_NFL_ROSTERS,
  async (job: Job) => {
    await refreshNflRoster(job.data);

    return;
  },
  { connection: redisClient }
);
