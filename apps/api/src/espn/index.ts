import { createRefreshNflRosterJob } from "@repo/lib/queues";
import { withPuppeteerPage, PuppeteerPage } from "@repo/lib/puppeteer";

import redis from "../config/ioredis";

export async function createRefreshNflRosterJobsForAll() {
  const nflTeams = await withPuppeteerPage(async (page: PuppeteerPage) => {
    await page.goto("https://www.espn.com/nfl/teams", { waitUntil: "load" });

    const result = await page.evaluate(
      `JSON.stringify(__espnfitt__.page.content.teams.nfl);`
    );

    return JSON.parse(result as string);
  });

  for (const team of nflTeams.flatMap((nt: any) => nt.teams)) {
    console.log(team.name);

    await createRefreshNflRosterJob(redis, { rosterUrl: team.href });
  }
}
