import { pgTable, foreignKey, serial, integer, varchar, unique, timestamp, date, primaryKey, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const habits = pgTable("habits", {
	id: serial().primaryKey().notNull(),
	iddata: integer(),
	habits: varchar({ length: 80 }),
}, (table) => [
	foreignKey({
			columns: [table.iddata],
			foreignColumns: [data.id],
			name: "habits_iddata_fkey"
		}),
]);

export const activity = pgTable("activity", {
	id: serial().primaryKey().notNull(),
	iddata: integer(),
	activity: varchar({ length: 20 }),
}, (table) => [
	foreignKey({
			columns: [table.iddata],
			foreignColumns: [data.id],
			name: "activity_iddata_fkey"
		}),
]);

export const keywords = pgTable("keywords", {
	id: serial().primaryKey().notNull(),
	keyword: varchar({ length: 50 }).notNull(),
}, (table) => [
	unique("keywords_keyword_key").on(table.keyword),
]);

export const progress = pgTable("progress", {
	id: serial().primaryKey().notNull(),
});

export const challenges = pgTable("challenges", {
	id: serial().primaryKey().notNull(),
	idprogress: integer(),
	name: varchar({ length: 40 }),
	description: varchar({ length: 100 }),
	difficultyLevel: varchar("difficulty_level", { length: 15 }),
	rewardsPoints: integer("rewards_points"),
	createdBy: integer("created_by"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.idprogress],
			foreignColumns: [progress.id],
			name: "challenges_idprogress_fkey"
		}),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "challenges_created_by_fkey"
		}),
]);

export const achievements = pgTable("achievements", {
	id: serial().primaryKey().notNull(),
	idprogress: integer(),
	name: varchar({ length: 40 }).notNull(),
	description: varchar({ length: 200 }),
	iconUrl: varchar("icon_url", { length: 255 }),
	targetValue: integer("target_value"),
	createdBy: integer("created_by"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.idprogress],
			foreignColumns: [progress.id],
			name: "achievements_idprogress_fkey"
		}),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "achievements_created_by_fkey"
		}),
]);

export const routines = pgTable("routines", {
	id: serial().primaryKey().notNull(),
	idprogress: integer(),
	name: varchar({ length: 50 }).notNull(),
	description: varchar({ length: 200 }),
	frequency: varchar({ length: 15 }),
	durationMinutes: integer("duration_minutes"),
	createdBy: integer("created_by"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.idprogress],
			foreignColumns: [progress.id],
			name: "routines_idprogress_fkey"
		}),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "routines_created_by_fkey"
		}),
]);

export const groups = pgTable("groups", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 70 }),
	description: varchar({ length: 200 }),
	iconUrl: varchar("icon_url", { length: 255 }),
	createdBy: integer("created_by"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "groups_created_by_fkey"
		}),
]);

export const tags = pgTable("tags", {
	id: serial().primaryKey().notNull(),
	tagName: varchar("tag_name", { length: 50 }).notNull(),
}, (table) => [
	unique("tags_tag_name_key").on(table.tagName),
]);

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 40 }).notNull(),
	lastNames: varchar("last_names", { length: 40 }).notNull(),
	email: varchar({ length: 100 }).notNull(),
	passwordHash: varchar("password_hash", { length: 255 }).notNull(),
	birthday: date().notNull(),
	country: varchar({ length: 40 }).notNull(),
	city: varchar({ length: 40 }).notNull(),
	registerdate: timestamp({ mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	unique("users_email_key").on(table.email),
]);

export const profile = pgTable("profile", {
	id: serial().primaryKey().notNull(),
	idusers: integer(),
	avatarurl: varchar({ length: 120 }).notNull(),
	nickname: varchar({ length: 60 }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idusers],
			foreignColumns: [users.id],
			name: "profile_idusers_fkey"
		}),
	unique("profile_idusers_key").on(table.idusers),
]);

export const data = pgTable("data", {
	id: serial().primaryKey().notNull(),
	idusers: integer(),
}, (table) => [
	foreignKey({
			columns: [table.idusers],
			foreignColumns: [users.id],
			name: "data_idusers_fkey"
		}),
]);

export const objective = pgTable("objective", {
	id: serial().primaryKey().notNull(),
	iddata: integer(),
	objective: varchar({ length: 200 }),
}, (table) => [
	foreignKey({
			columns: [table.iddata],
			foreignColumns: [data.id],
			name: "objective_iddata_fkey"
		}),
]);

export const groupmembers = pgTable("groupmembers", {
	id: serial().primaryKey().notNull(),
	groupId: integer("group_id"),
	usersId: integer("users_id"),
	joinedAt: timestamp("joined_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.groupId],
			foreignColumns: [groups.id],
			name: "groupmembers_group_id_fkey"
		}),
	foreignKey({
			columns: [table.usersId],
			foreignColumns: [users.id],
			name: "groupmembers_users_id_fkey"
		}),
]);

export const publications = pgTable("publications", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 40 }),
	description: varchar({ length: 200 }),
	createdBy: integer("created_by"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	likes: integer(),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "publications_created_by_fkey"
		}),
]);

export const comentarios = pgTable("comentarios", {
	id: serial().primaryKey().notNull(),
	idpublication: integer(),
	description: varchar({ length: 200 }),
	createdBy: integer("created_by"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	likes: integer(),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "comentarios_created_by_fkey"
		}),
	foreignKey({
			columns: [table.idpublication],
			foreignColumns: [publications.id],
			name: "comentarios_idpublication_fkey"
		}),
]);

export const objectivekeywords = pgTable("objectivekeywords", {
	objectiveId: integer("objective_id").notNull(),
	keywordId: integer("keyword_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.objectiveId],
			foreignColumns: [objective.id],
			name: "objectivekeywords_objective_id_fkey"
		}),
	foreignKey({
			columns: [table.keywordId],
			foreignColumns: [keywords.id],
			name: "objectivekeywords_keyword_id_fkey"
		}),
	primaryKey({ columns: [table.objectiveId, table.keywordId], name: "objectivekeywords_pkey"}),
]);

export const activitykeywords = pgTable("activitykeywords", {
	activityId: integer("activity_id").notNull(),
	keywordId: integer("keyword_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.activityId],
			foreignColumns: [activity.id],
			name: "activitykeywords_activity_id_fkey"
		}),
	foreignKey({
			columns: [table.keywordId],
			foreignColumns: [keywords.id],
			name: "activitykeywords_keyword_id_fkey"
		}),
	primaryKey({ columns: [table.activityId, table.keywordId], name: "activitykeywords_pkey"}),
]);

export const habitskeywords = pgTable("habitskeywords", {
	habitId: integer("habit_id").notNull(),
	keywordId: integer("keyword_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.habitId],
			foreignColumns: [habits.id],
			name: "habitskeywords_habit_id_fkey"
		}),
	foreignKey({
			columns: [table.keywordId],
			foreignColumns: [keywords.id],
			name: "habitskeywords_keyword_id_fkey"
		}),
	primaryKey({ columns: [table.habitId, table.keywordId], name: "habitskeywords_pkey"}),
]);

export const grouptags = pgTable("grouptags", {
	groupId: integer("group_id").notNull(),
	tagId: integer("tag_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.groupId],
			foreignColumns: [groups.id],
			name: "grouptags_group_id_fkey"
		}),
	foreignKey({
			columns: [table.tagId],
			foreignColumns: [tags.id],
			name: "grouptags_tag_id_fkey"
		}),
	primaryKey({ columns: [table.groupId, table.tagId], name: "grouptags_pkey"}),
]);

export const tagkeywords = pgTable("tagkeywords", {
	tagId: integer("tag_id").notNull(),
	keywordId: integer("keyword_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.tagId],
			foreignColumns: [tags.id],
			name: "tagkeywords_tag_id_fkey"
		}),
	foreignKey({
			columns: [table.keywordId],
			foreignColumns: [keywords.id],
			name: "tagkeywords_keyword_id_fkey"
		}),
	primaryKey({ columns: [table.tagId, table.keywordId], name: "tagkeywords_pkey"}),
]);

export const publicationtags = pgTable("publicationtags", {
	publicationId: integer("publication_id").notNull(),
	tagId: integer("tag_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.publicationId],
			foreignColumns: [publications.id],
			name: "publicationtags_publication_id_fkey"
		}),
	foreignKey({
			columns: [table.tagId],
			foreignColumns: [tags.id],
			name: "publicationtags_tag_id_fkey"
		}),
	primaryKey({ columns: [table.publicationId, table.tagId], name: "publicationtags_pkey"}),
]);

export const have = pgTable("have", {
	idprogress: integer().notNull(),
	idusers: integer().notNull(),
	startDate: date("start_date"),
	isCompleted: boolean("is_completed"),
}, (table) => [
	foreignKey({
			columns: [table.idusers],
			foreignColumns: [users.id],
			name: "have_idusers_fkey"
		}),
	foreignKey({
			columns: [table.idprogress],
			foreignColumns: [progress.id],
			name: "have_idprogress_fkey"
		}),
	primaryKey({ columns: [table.idprogress, table.idusers], name: "have_pkey"}),
]);
