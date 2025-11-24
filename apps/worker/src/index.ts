import { Worker, Job } from "bullmq";

import { QUEUES } from "@repo/lib/queues";
import redis from "./config/ioredis";
import { refreshNflRoster } from "./espn";

// Instantiate all the workers here
const espnRefreshNflRostersWorker = new Worker(
  QUEUES.ESPN_REFRESH_NFL_ROSTERS,
  async (job: Job) => {
    await refreshNflRoster(job.data);

    return;
  },
  { connection: redis }
);
