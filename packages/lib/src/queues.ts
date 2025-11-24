import { Queue } from "bullmq";
import type { JobsOptions } from "bullmq";
import type { Redis } from "ioredis";

export enum QUEUES {
  ESPN_REFRESH_NFL_ROSTERS = "ESPN_REFRESH_NFL_ROSTERS",
}

export async function createRefreshNflRosterJob(
  redis: Redis,
  data: { rosterUrl: string },
  { jobOptions = {} as JobsOptions } = {}
) {
  const queue = new Queue(QUEUES.ESPN_REFRESH_NFL_ROSTERS, {
    connection: redis,
  });

  let res = null;

  try {
    res = await queue.add(QUEUES.ESPN_REFRESH_NFL_ROSTERS, data, {
      removeOnComplete: 10,
      removeOnFail: 50,
      ...jobOptions,
    });
  } catch (err) {
    console.error(err);

    throw err;
  } finally {
    await queue.close();
  }

  return res;
}
