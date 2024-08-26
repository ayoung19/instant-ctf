import { init, id } from "@instantdb/admin";
import { env } from "./utils/env";
import { Client } from "./client";
import { InstantSchema } from "./types/schema";

const db = init<InstantSchema>({
  appId: "c7a8aae8-5bfc-43e7-9be1-6f439475a114",
  adminToken: env.INSTANT_APP_ADMIN_TOKEN,
});

export default async function Home() {
  const token = await db.auth.createToken(`${id()}@instant-ctf.com`);

  return <Client token={token} />;
}
