-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "objective" (
	"id" integer PRIMARY KEY NOT NULL,
	"iddata" integer,
	"objective" varchar(200)
);
--> statement-breakpoint
CREATE TABLE "activity" (
	"id" integer PRIMARY KEY NOT NULL,
	"iddata" integer,
	"activity" varchar(20)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(40) NOT NULL,
	"last_names" varchar(40) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"birthday" date NOT NULL,
	"country" varchar(40) NOT NULL,
	"city" varchar(40) NOT NULL,
	"registerdate" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "users_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "profile" (
	"id" integer PRIMARY KEY NOT NULL,
	"idusers" integer,
	"avatarurl" varchar(120) NOT NULL,
	"nickname" varchar(60) NOT NULL,
	CONSTRAINT "profile_idusers_key" UNIQUE("idusers")
);
--> statement-breakpoint
CREATE TABLE "data" (
	"id" integer PRIMARY KEY NOT NULL,
	"idusers" integer
);
--> statement-breakpoint
CREATE TABLE "habits" (
	"id" integer PRIMARY KEY NOT NULL,
	"iddata" integer,
	"habits" varchar(80)
);
--> statement-breakpoint
CREATE TABLE "keywords" (
	"id" integer PRIMARY KEY NOT NULL,
	"keyword" varchar(50) NOT NULL,
	CONSTRAINT "keywords_keyword_key" UNIQUE("keyword")
);
--> statement-breakpoint
CREATE TABLE "progress" (
	"id" integer PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "challenges" (
	"id" integer PRIMARY KEY NOT NULL,
	"idprogress" integer,
	"name" varchar(40),
	"description" varchar(100),
	"difficulty_level" varchar(15),
	"rewards_points" integer,
	"created_by" integer,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "groups" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(70),
	"description" varchar(200),
	"icon_url" varchar(255),
	"created_by" integer,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "achievements" (
	"id" integer PRIMARY KEY NOT NULL,
	"idprogress" integer,
	"name" varchar(40) NOT NULL,
	"description" varchar(200),
	"icon_url" varchar(255),
	"target_value" integer,
	"created_by" integer,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "routines" (
	"id" integer PRIMARY KEY NOT NULL,
	"idprogress" integer,
	"name" varchar(50) NOT NULL,
	"description" varchar(200),
	"frequency" varchar(15),
	"duration_minutes" integer,
	"created_by" integer,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" integer PRIMARY KEY NOT NULL,
	"tag_name" varchar(50) NOT NULL,
	CONSTRAINT "tags_tag_name_key" UNIQUE("tag_name")
);
--> statement-breakpoint
CREATE TABLE "groupmembers" (
	"id" integer PRIMARY KEY NOT NULL,
	"group_id" integer,
	"users_id" integer,
	"joined_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "publications" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(40),
	"description" varchar(200),
	"created_by" integer,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"likes" integer
);
--> statement-breakpoint
CREATE TABLE "comentarios" (
	"id" integer PRIMARY KEY NOT NULL,
	"idpublication" integer,
	"description" varchar(200),
	"created_by" integer,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"likes" integer
);
--> statement-breakpoint
CREATE TABLE "objectivekeywords" (
	"objective_id" integer NOT NULL,
	"keyword_id" integer NOT NULL,
	CONSTRAINT "objectivekeywords_pkey" PRIMARY KEY("objective_id","keyword_id")
);
--> statement-breakpoint
CREATE TABLE "activitykeywords" (
	"activity_id" integer NOT NULL,
	"keyword_id" integer NOT NULL,
	CONSTRAINT "activitykeywords_pkey" PRIMARY KEY("activity_id","keyword_id")
);
--> statement-breakpoint
CREATE TABLE "habitskeywords" (
	"habit_id" integer NOT NULL,
	"keyword_id" integer NOT NULL,
	CONSTRAINT "habitskeywords_pkey" PRIMARY KEY("habit_id","keyword_id")
);
--> statement-breakpoint
CREATE TABLE "tagkeywords" (
	"tag_id" integer NOT NULL,
	"keyword_id" integer NOT NULL,
	CONSTRAINT "tagkeywords_pkey" PRIMARY KEY("tag_id","keyword_id")
);
--> statement-breakpoint
CREATE TABLE "grouptags" (
	"group_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "grouptags_pkey" PRIMARY KEY("group_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "publicationtags" (
	"publication_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "publicationtags_pkey" PRIMARY KEY("publication_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "have" (
	"idprogress" integer NOT NULL,
	"idusers" integer NOT NULL,
	"start_date" date,
	"is_completed" boolean,
	CONSTRAINT "have_pkey" PRIMARY KEY("idprogress","idusers")
);
--> statement-breakpoint
ALTER TABLE "objective" ADD CONSTRAINT "objective_iddata_fkey" FOREIGN KEY ("iddata") REFERENCES "public"."data"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity" ADD CONSTRAINT "activity_iddata_fkey" FOREIGN KEY ("iddata") REFERENCES "public"."data"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_idusers_fkey" FOREIGN KEY ("idusers") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "data" ADD CONSTRAINT "data_idusers_fkey" FOREIGN KEY ("idusers") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habits" ADD CONSTRAINT "habits_iddata_fkey" FOREIGN KEY ("iddata") REFERENCES "public"."data"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_idprogress_fkey" FOREIGN KEY ("idprogress") REFERENCES "public"."progress"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "groups" ADD CONSTRAINT "groups_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "achievements" ADD CONSTRAINT "achievements_idprogress_fkey" FOREIGN KEY ("idprogress") REFERENCES "public"."progress"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "achievements" ADD CONSTRAINT "achievements_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "routines" ADD CONSTRAINT "routines_idprogress_fkey" FOREIGN KEY ("idprogress") REFERENCES "public"."progress"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "routines" ADD CONSTRAINT "routines_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "groupmembers" ADD CONSTRAINT "groupmembers_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "groupmembers" ADD CONSTRAINT "groupmembers_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "publications" ADD CONSTRAINT "publications_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_idpublication_fkey" FOREIGN KEY ("idpublication") REFERENCES "public"."publications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "objectivekeywords" ADD CONSTRAINT "objectivekeywords_objective_id_fkey" FOREIGN KEY ("objective_id") REFERENCES "public"."objective"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "objectivekeywords" ADD CONSTRAINT "objectivekeywords_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "public"."keywords"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activitykeywords" ADD CONSTRAINT "activitykeywords_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "public"."activity"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activitykeywords" ADD CONSTRAINT "activitykeywords_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "public"."keywords"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habitskeywords" ADD CONSTRAINT "habitskeywords_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "public"."habits"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habitskeywords" ADD CONSTRAINT "habitskeywords_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "public"."keywords"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tagkeywords" ADD CONSTRAINT "tagkeywords_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tagkeywords" ADD CONSTRAINT "tagkeywords_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "public"."keywords"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grouptags" ADD CONSTRAINT "grouptags_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grouptags" ADD CONSTRAINT "grouptags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "publicationtags" ADD CONSTRAINT "publicationtags_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "public"."publications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "publicationtags" ADD CONSTRAINT "publicationtags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "have" ADD CONSTRAINT "have_idusers_fkey" FOREIGN KEY ("idusers") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "have" ADD CONSTRAINT "have_idprogress_fkey" FOREIGN KEY ("idprogress") REFERENCES "public"."progress"("id") ON DELETE no action ON UPDATE no action;
*/