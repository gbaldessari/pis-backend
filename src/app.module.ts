import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { GraphqlModule } from 'src/graphql/graphql.module';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { RolesModule } from './modules/roles/roles.module';
import { EmailModule } from './modules/users/email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UsersModule,
    GraphqlModule,
    RolesModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}