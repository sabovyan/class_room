import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schema/*",
  out: "./migrations",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
});
