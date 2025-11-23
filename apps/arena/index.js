require("dotenv").config();
const Arena = require("bull-arena");
const { Queue: BullMQ } = require("bullmq");

const { QUEUES } = require("@repo/queues");

Arena({
  BullMQ: BullMQ,
  queues: [
    {
      type: "bullmq",
      name: QUEUES.ESPN,
      hostId: "WORKER",
      redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    },
  ],
});
