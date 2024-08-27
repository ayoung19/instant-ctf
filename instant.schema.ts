import { i } from "@instantdb/core";

const graph = i.graph(
  "c7a8aae8-5bfc-43e7-9be1-6f439475a114",
  {
    players: i.entity({
      position: i.json<{ x: number; y: number }>(),
    }),
  },
  {}
);

export default graph;
