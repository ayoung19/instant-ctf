import { User, id, init, lookup, tx } from "@instantdb/react";
import { Background, Controls, ReactFlow } from "@xyflow/react";
import { useEffect, useRef, useState } from "react";
import { Db } from "../client";

interface Props {
  db: Db;
  user: User;
}

export const App = ({ db, user }: Props) => {
  const [movement, setMovement] = useState({ x: 0, y: 0 });

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "KeyW":
          setMovement((prevState) => ({ ...prevState, y: prevState.y + 1 }));
        case "KeyA":
          setMovement((prevState) => ({ ...prevState, y: prevState.x - 1 }));
        case "KeyS":
          setMovement((prevState) => ({ ...prevState, y: prevState.y - 1 }));
        case "KeyD":
          setMovement((prevState) => ({ ...prevState, y: prevState.x + 1 }));
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.code) {
        case "KeyW":
          setMovement((prevState) => ({ ...prevState, y: prevState.y - 1 }));
        case "KeyA":
          setMovement((prevState) => ({ ...prevState, y: prevState.x + 1 }));
        case "KeyS":
          setMovement((prevState) => ({ ...prevState, y: prevState.y + 1 }));
        case "KeyD":
          setMovement((prevState) => ({ ...prevState, y: prevState.x - 1 }));
      }
    });
  }, []);

  useEffect(() => {
    db.transact([
      tx.movements[lookup("playerId", user.id)].update({
        x: movement.x,
        y: movement.y,
      }),
    ]);
  }, [movement.x, movement.y]);

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={[
          {
            id: "1",
            type: "input",
            data: { label: "Input Node" },
            position: { x: 0, y: 0 },
          },
        ]}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        zoomOnPinch={false}
        nodesDraggable={false}
        nodesConnectable={false}
        nodesFocusable={false}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};
