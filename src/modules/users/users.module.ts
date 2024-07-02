import { Module } from "@nestjs/common";
import { UserResolver } from "./users.resolver";
import { UserService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/modules/users/entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { EmailService } from "src/modules/users/email/email.module";
import { JwtStrategy } from "./jwt/jwt.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
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
    ConfigService,
    { provide: 'MAIL_SERVICE', useClass: EmailService },
    UserResolver, 
    UserService, 
    JwtStrategy
  ],
  exports: [UserService, ConfigService, JwtModule]
})
export class UsersModule {}