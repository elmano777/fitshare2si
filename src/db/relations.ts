import { relations } from 'drizzle-orm/relations';
import {
  data,
  habits,
  activity,
  progress,
  challenges,
  users,
  achievements,
  routines,
  groups,
  profile,
  objective,
  groupmembers,
  publications,
  comentarios,
  objectivekeywords,
  keywords,
  activitykeywords,
  habitskeywords,
  grouptags,
  tags,
  tagkeywords,
  publicationtags,
  have,
} from './schema';

export const habitsRelations = relations(habits, ({ one, many }) => ({
  datum: one(data, {
    fields: [habits.iddata],
    references: [data.id],
  }),
  habitskeywords: many(habitskeywords),
}));

export const dataRelations = relations(data, ({ one, many }) => ({
  habits: many(habits),
  activities: many(activity),
  user: one(users, {
    fields: [data.idusers],
    references: [users.id],
  }),
  objectives: many(objective),
}));

export const activityRelations = relations(activity, ({ one, many }) => ({
  datum: one(data, {
    fields: [activity.iddata],
    references: [data.id],
  }),
  activitykeywords: many(activitykeywords),
}));

export const challengesRelations = relations(challenges, ({ one }) => ({
  progress: one(progress, {
    fields: [challenges.idprogress],
    references: [progress.id],
  }),
  user: one(users, {
    fields: [challenges.createdBy],
    references: [users.id],
  }),
}));

export const progressRelations = relations(progress, ({ many }) => ({
  challenges: many(challenges),
  achievements: many(achievements),
  routines: many(routines),
  have: many(have),
}));

export const usersRelations = relations(users, ({ many, one }) => ({
  challenges: many(challenges),
  achievements: many(achievements),
  routines: many(routines),
  groups: many(groups),
  profile: one(profile, {
    fields: [users.id],
    references: [profile.idusers],
  }),
  data: many(data),
  groupmembers: many(groupmembers),
  publications: many(publications),
  comentarios: many(comentarios),
  have: many(have),
}));

export const achievementsRelations = relations(achievements, ({ one }) => ({
  progress: one(progress, {
    fields: [achievements.idprogress],
    references: [progress.id],
  }),
  user: one(users, {
    fields: [achievements.createdBy],
    references: [users.id],
  }),
}));

export const routinesRelations = relations(routines, ({ one }) => ({
  progress: one(progress, {
    fields: [routines.idprogress],
    references: [progress.id],
  }),
  user: one(users, {
    fields: [routines.createdBy],
    references: [users.id],
  }),
}));

export const groupsRelations = relations(groups, ({ one, many }) => ({
  user: one(users, {
    fields: [groups.createdBy],
    references: [users.id],
  }),
  groupmembers: many(groupmembers),
  grouptags: many(grouptags),
}));

export const profileRelations = relations(profile, ({ one }) => ({
  user: one(users, {
    fields: [profile.idusers],
    references: [users.id],
  }),
}));

export const objectiveRelations = relations(objective, ({ one, many }) => ({
  datum: one(data, {
    fields: [objective.iddata],
    references: [data.id],
  }),
  objectivekeywords: many(objectivekeywords),
}));

export const groupmembersRelations = relations(groupmembers, ({ one }) => ({
  group: one(groups, {
    fields: [groupmembers.groupId],
    references: [groups.id],
  }),
  user: one(users, {
    fields: [groupmembers.usersId],
    references: [users.id],
  }),
}));

export const publicationsRelations = relations(
  publications,
  ({ one, many }) => ({
    user: one(users, {
      fields: [publications.createdBy],
      references: [users.id],
    }),
    comentarios: many(comentarios),
    publicationtags: many(publicationtags),
  }),
);

export const comentariosRelations = relations(comentarios, ({ one }) => ({
  user: one(users, {
    fields: [comentarios.createdBy],
    references: [users.id],
  }),
  publication: one(publications, {
    fields: [comentarios.idpublication],
    references: [publications.id],
  }),
}));

export const objectivekeywordsRelations = relations(
  objectivekeywords,
  ({ one }) => ({
    objective: one(objective, {
      fields: [objectivekeywords.objectiveId],
      references: [objective.id],
    }),
    keyword: one(keywords, {
      fields: [objectivekeywords.keywordId],
      references: [keywords.id],
    }),
  }),
);

export const keywordsRelations = relations(keywords, ({ many }) => ({
  objectivekeywords: many(objectivekeywords),
  activitykeywords: many(activitykeywords),
  habitskeywords: many(habitskeywords),
  tagkeywords: many(tagkeywords),
}));

export const activitykeywordsRelations = relations(
  activitykeywords,
  ({ one }) => ({
    activity: one(activity, {
      fields: [activitykeywords.activityId],
      references: [activity.id],
    }),
    keyword: one(keywords, {
      fields: [activitykeywords.keywordId],
      references: [keywords.id],
    }),
  }),
);

export const habitskeywordsRelations = relations(habitskeywords, ({ one }) => ({
  habit: one(habits, {
    fields: [habitskeywords.habitId],
    references: [habits.id],
  }),
  keyword: one(keywords, {
    fields: [habitskeywords.keywordId],
    references: [keywords.id],
  }),
}));

export const grouptagsRelations = relations(grouptags, ({ one }) => ({
  group: one(groups, {
    fields: [grouptags.groupId],
    references: [groups.id],
  }),
  tag: one(tags, {
    fields: [grouptags.tagId],
    references: [tags.id],
  }),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  grouptags: many(grouptags),
  tagkeywords: many(tagkeywords),
  publicationtags: many(publicationtags),
}));

export const tagkeywordsRelations = relations(tagkeywords, ({ one }) => ({
  tag: one(tags, {
    fields: [tagkeywords.tagId],
    references: [tags.id],
  }),
  keyword: one(keywords, {
    fields: [tagkeywords.keywordId],
    references: [keywords.id],
  }),
}));

export const publicationtagsRelations = relations(
  publicationtags,
  ({ one }) => ({
    publication: one(publications, {
      fields: [publicationtags.publicationId],
      references: [publications.id],
    }),
    tag: one(tags, {
      fields: [publicationtags.tagId],
      references: [tags.id],
    }),
  }),
);

export const haveRelations = relations(have, ({ one }) => ({
  user: one(users, {
    fields: [have.idusers],
    references: [users.id],
  }),
  progress: one(progress, {
    fields: [have.idprogress],
    references: [progress.id],
  }),
}));
