import { Module } from "@nestjs/common";
import { UserResolver } from "./users.resolver";
import { UserService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/modules/users/entities/user.entity";
import { UserSettingsService } from "./user-settings.service";
import { UserSetting } from "src/modules/users/entities/user-settings.entity";
import { UserSettingsResolver } from "src/modules/users/user-settings.resolver";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { EmailService } from "src/modules/users/email/email.module";
import { JwtStrategy } from "./jwt/jwt.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserSetting]),
    JwtModule.registerAsync({
        useFactory: (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '12h' },
          global: true
        }),
        inject: [ConfigService],
    }),
  ],
  providers: [
    { provide: 'MAIL_SERVICE', useClass: EmailService },
    UserResolver, 
    UserService, 
    UserSettingsService,
    UserSettingsResolver,
    JwtStrategy
  ],
  exports: [UserService, UserSettingsService]
})
export class UsersModule {}