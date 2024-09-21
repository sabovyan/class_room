import {
  sqliteTable,
  primaryKey,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const account = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
  },
  (table) => {
    return {
      pk0: primaryKey({
        columns: [table.provider, table.providerAccountId],
        name: "account_provider_providerAccountId_pk",
      }),
    };
  },
);

export const session = sqliteTable("session", {
  sessionToken: text("sessionToken").primaryKey().notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expires: integer("expires").notNull(),
});

export const user = sqliteTable(
  "user",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name"),
    email: text("email"),
    emailVerified: integer("emailVerified"),
    image: text("image"),
  },
  (table) => {
    return {
      emailUnique: uniqueIndex("user_email_unique").on(table.email),
    };
  },
);

export const verificationToken = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires").notNull(),
  },
  (table) => {
    return {
      pk0: primaryKey({
        columns: [table.identifier, table.token],
        name: "verificationToken_identifier_token_pk",
      }),
    };
  },
);

export const space = sqliteTable("space", {
  id: text("id").primaryKey().notNull(),
  name: text("name"),
  description: text("description"),
  ownerId: text("ownerId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

