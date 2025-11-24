import assert from "assert";
import { withPuppeteerPage, PuppeteerPage } from "@repo/lib/puppeteer";

import { athleteRepo, teamRepo } from "../config/db";

export async function refreshNflRoster({ rosterUrl }: { rosterUrl: string }) {
  const roster = JSON.parse(
    await withPuppeteerPage(async (page: PuppeteerPage) => {
      rosterUrl = rosterUrl.replace("/nfl/team/", "/nfl/team/roster/");

      console.log(`Going to ${rosterUrl}`);

      await page.goto(rosterUrl, { waitUntil: "load" });

      const result = await page.evaluate(
        `JSON.stringify(__espnfitt__.page.content.roster, null, 2);`
      );

      return result;
    })
  );

  // Upsert the team here
  const {
    identifiers: [upsertedTeamIdentifier],
  } = await teamRepo.upsert(
    {
      name: roster.team.displayName,
      abbrev: roster.team.abbrev,
      external_id: roster.team.id,
      league: "nfl",
      source: "espn",
    },
    ["source", "league", "external_id"]
  );

  const upsertedTeam = await teamRepo.findOne({
    where: upsertedTeamIdentifier,
  });

  assert(upsertedTeam);

  console.log(upsertedTeam.name);

  // Upsert the athletes
  const athletes = roster.groups.flatMap((g: any) => g.athletes);

  for (const athlete of athletes) {
    const athletePatch = {
      name: athlete.name,
      source: "espn",
      external_id: athlete.id,
      nfl_team: upsertedTeam,
    };

    const {
      identifiers: [upsertedAthleteIdentifier],
    } = await athleteRepo.upsert(athletePatch, ["source", "external_id"]);

    const upsertedAthlete = await athleteRepo.findOne({
      where: upsertedAthleteIdentifier,
    });

    assert(upsertedAthlete);

    console.log(`  ${upsertedAthlete.name}`);
  }

  // TODO
  // For each athlete upsert their stats

  return roster;
}
