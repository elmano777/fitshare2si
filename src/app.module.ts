import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { GroupsModule } from './groups/groups.module';
import { DataModule } from './data/data.module';
import { ProgressModule } from './progress/progress.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DbModule, AuthModule, DashboardModule, GroupsModule, DataModule, ProgressModule],
})
export class AppModule { }
