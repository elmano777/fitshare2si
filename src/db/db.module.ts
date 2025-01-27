import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import * as relations from './relations';
import { DrizzleInstance } from './types/drizzle.types';

export const DRIZZLE = Symbol('drizzle-connection');

@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<DrizzleInstance> => {
        const databaseURL = configService.get<string>('DATABASE_URL');

        const pool = new Pool({
          connectionString: databaseURL,
          ssl: process.env.NODE_ENV === 'production' ? true : false,
        });

        return drizzle(pool, {
          schema: {
            ...schema,
            ...relations,
          },
        });
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DbModule {}
