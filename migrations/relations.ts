import { relations } from "drizzle-orm/relations";
import { user, account, session, space } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	sessions: many(session),
	spaces: many(space),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const spaceRelations = relations(space, ({one}) => ({
	user: one(user, {
		fields: [space.ownerId],
		references: [user.id]
	}),
}));