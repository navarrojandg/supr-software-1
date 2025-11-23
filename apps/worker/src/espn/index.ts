import { withPage } from "../lib/puppeteer";

import { athleteRepo } from "../config/db";

export async function refreshNflRoster({ rosterUrl }: { rosterUrl: string }) {
  const roster = JSON.parse(
    await withPage(async (page) => {
      await page.goto(rosterUrl, { waitUntil: "load" });

      const result = await page.evaluate(
        `JSON.stringify(__espnfitt__.page.content.roster);`
      );

      return result;
    })
  );

  console.log(roster.team.displayName);

  for (const group of roster.groups) {
    console.log(` ${group.name}`);

    for (const athlete of group.athletes) {
      const athletePatch = {
        name: athlete.name,
        source: "espn",
        external_id: athlete.id,
      };

      await athleteRepo.upsert(athletePatch, ["source", "external_id"]);

      console.log(`  ${athlete.name}`);
    }
  }

  return roster;
}
