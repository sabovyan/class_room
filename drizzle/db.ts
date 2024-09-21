import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import dotenv from "dotenv";
import { users, accounts, sessions, verificationTokens } from "./schema/auth";
import { spaces } from "./schema/space";

dotenv.config({ path: ".env" });

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const schema = {
  users,
  accounts,
  sessions,
  verificationTokens,
  spaces,
};

export const db = drizzle(client, { schema });
