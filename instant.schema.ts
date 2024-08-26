import { i } from "@instantdb/core";

const graph = i.graph(
  "c7a8aae8-5bfc-43e7-9be1-6f439475a114",
  {
    movements: i.entity({
      playerId: i.string().unique().indexed(),
      x: i.number(),
      y: i.number(),
    }),
  },
  {}
);

export default graph;
