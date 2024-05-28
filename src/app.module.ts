import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { GraphqlModule } from 'src/graphql/graphql.module';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { EmailModule } from './modules/users/email/email.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { MeetsModule } from './modules/meets/meets.module';
import { ReviewModule } from './modules/jobs/review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    GraphqlModule,
    EmailModule,
    UsersModule,
    JobsModule,
    MeetsModule,
    ReviewModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}