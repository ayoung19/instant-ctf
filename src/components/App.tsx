import { User, tx } from "@instantdb/react";
import { Background, ReactFlow } from "@xyflow/react";
import { useEffect, useRef, useState } from "react";
import { Db } from "../app/client";

interface Props {
  db: Db;
  user: User;
}

export const App = ({ db, user }: Props) => {
  const playersQuery = db.useQuery({ players: {} });
  const [_, setPosition] = useState({ x: 0, y: 0 });

  const movementControlRef = useRef({
    up: 0,
    left: 0,
    down: 0,
    right: 0,
  });

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "KeyW":
          movementControlRef.current.up = 1;
          return;
        case "KeyA":
          movementControlRef.current.left = 1;
          return;
        case "KeyS":
          movementControlRef.current.down = 1;
          return;
        case "KeyD":
          movementControlRef.current.right = 1;
          return;
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.code) {
        case "KeyW":
          movementControlRef.current.up = 0;
          return;
        case "KeyA":
          movementControlRef.current.left = 0;
          return;
        case "KeyS":
          movementControlRef.current.down = 0;
          return;
        case "KeyD":
          movementControlRef.current.right = 0;
          return;
      }
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const movementVector = {
        x: movementControlRef.current.right - movementControlRef.current.left,
        y: movementControlRef.current.down - movementControlRef.current.up,
      };

      if (movementVector.x === 0 && movementVector.y === 0) {
        return;
      }

      setPosition(({ x, y }) => {
        const newPosition = {
          x: x + 5 * movementVector.x,
          y: y + 5 * movementVector.y,
        };

        db.transact([
          tx.players[user.id].update({
            position: newPosition,
          }),
        ]);

        return newPosition;
      });
    }, 1000 / 64);

    return () => clearInterval(interval);
  }, [user.id, movementControlRef]);

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={(playersQuery.data?.players || []).map((player) => ({
          id: player.id,
          type: "input",
          data: { label: player.id },
          position: player.position,
        }))}
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
