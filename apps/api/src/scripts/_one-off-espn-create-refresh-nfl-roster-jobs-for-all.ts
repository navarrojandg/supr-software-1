import dotenv from "dotenv";
dotenv.config();

import { createRefreshNflRosterJobsForAll } from "../espn";
if (
  process.env.RUN_FUNCTION ===
  "_one-off-espn-create-refresh-nfl-roster-jobs-for-all"
) {
  (async () => {
    await createRefreshNflRosterJobsForAll();
  })()
    .then(() => {
      console.log("DONE");
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
