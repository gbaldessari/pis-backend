import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { UserSetting } from 'src/modules/users/entities/user-settings.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get<string>('TYPEORM_HOST'),
          port: parseInt(configService.get<string>('TYPEORM_PORT')),
          username: configService.get<string>('TYPEORM_USERNAME'),
          password: configService.get<string>('TYPEORM_PASSWORD'),
          database: configService.get<string>('TYPEORM_DATABASE'),
          entities: [User, UserSetting],
          synchronize: configService.get<boolean>('TYPEORM_SYNCHRONIZE'),
          logging: true,
      }),
    }),
  ],
})
export class DatabaseModule {}