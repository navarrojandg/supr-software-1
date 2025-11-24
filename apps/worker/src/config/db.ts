import { PostgresDataSource, Athlete } from "@repo/db";

(async () => {
  await PostgresDataSource.initialize();
})();

export const athleteRepo = PostgresDataSource.getRepository(Athlete);
