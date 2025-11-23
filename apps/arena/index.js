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
        host: "redis",
        port: 6379,
      },
    },
  ],
});
