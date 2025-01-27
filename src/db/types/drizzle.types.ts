import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../schema';
import * as relations from '../relations';

export type DrizzleInstance = NodePgDatabase<typeof schema & typeof relations>;
