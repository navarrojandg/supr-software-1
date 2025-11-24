import { PostgresDataSource, Athlete, Team } from "@repo/db";

(async () => {
  await PostgresDataSource.initialize();
})();

export const athleteRepo = PostgresDataSource.getRepository(Athlete);
export const teamRepo = PostgresDataSource.getRepository(Team);
