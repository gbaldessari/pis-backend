import { Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: 'testres3tpassw0rd@gmail.com',
          pass: process.env.SECRET_MAILER || 'obtx psev weus suui',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}

export { EmailService };
