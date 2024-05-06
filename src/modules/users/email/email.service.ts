import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class EmailService {
    constructor(private mailerService: MailerService) {}

    async sendUserRecovery(user: User) {
        const code = `${user.resetPasswordToken}`;
        await this.mailerService.sendMail({
            to: user.email,
            from: '"Equipo de soporte" <support@example.com>', 
            subject: 'Recuperación de contraseña',
            html: `<h1>Hey ${user.username},</h1>
            <h2>Usa el siguiente codigo para reestrablecer tu contrasena</h2>
            <p>
                ${ code }
            </p>
            <i>Si tu no pediste este codigo, puedes ignorarlo.</i>`,
            context: {  
                names: user.username,
                code: code,
            },
        });
        return { message: 'Correo enviado'}
    }
}
