"use client";

import { init } from "@instantdb/react";
import { InstantSchema } from "../types/schema";
import { useEffect } from "react";
import { App } from "../components/App";

const db = init<InstantSchema>({
  appId: "c7a8aae8-5bfc-43e7-9be1-6f439475a114",
});
export type Db = typeof db;

interface Props {
  token: string;
}

export const Client = ({ token }: Props) => {
  const auth = db.useAuth();

  useEffect(() => {
    db.auth.signInWithToken(token);
  }, [token]);

  if (auth.error) {
    return <div>{auth.error.message}</div>;
  }

  if (auth.isLoading) {
    <div>loading...</div>;
  }

  if (auth.user) {
    return <App db={db} user={auth.user} />;
  }

  return <div>loading...</div>;
};
