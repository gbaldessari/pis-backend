import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { RegisterInput } from 'src/modules/users/dto/register-input'
import { Repository, Connection, EntityManager } from 'typeorm';
import { HttpStatus } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { LoginInput } from './dto/login-input';
import { JwtService } from '@nestjs/jwt';
import { EditUserInput } from './dto/edit-user-input';
import { EmailService } from './email/email.service';
import { ResetPasswordInput } from './dto/reset-password-input';
import { randomBytes } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private connection: Connection,
    private jwtService: JwtService,
    private mailService: EmailService,
  ) {}

  async getUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async getUserById(id:number){
    return await this.userRepository.findOneBy({id});
  }

  async getUsers() {
    return this.userRepository.find({ relations: ['settings'] });
  }

  async login(loginInput: LoginInput) {
    try {
      const { email, password } = loginInput;
      const findUser = await this.userRepository.findOne({ where: { email } });

      if (!findUser) throw new Error('Usuario no encontrado');

      const passwordMatch = await compare(password, findUser.password);
      if (!passwordMatch) throw new Error('Contraseña incorrecta');

      const payload = { email: findUser.email, username: findUser.username };
      const access_token = this.jwtService.sign(payload);

      return { email: findUser.email, token: access_token };
    } catch (error) {
      throw new Error(String(error) + "INTERNAL ERROR");
    }
  }

  async register(registerInput: RegisterInput) {
    const exist = await this.userRepository.findOne({
      where: {
        email: registerInput?.email,
      },
    });

    if (exist) throw new Error('Usuario ya existe');

    const { password } = registerInput;

    const hashedPassword = await hash(password, 10);
    registerInput = { ...registerInput, password: hashedPassword };

    let user: User;
    await this.connection.transaction(
      async (transactionalEntityManager: EntityManager): Promise<void> => {
        try {
          user = this.userRepository.create(registerInput);
          await transactionalEntityManager.save(user);
        } catch (error: unknown) {
          throw new Error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }
      },
    );
    return { user: user, message: 'Usuario registrado' };
  }

  async updateByEmail(email: string, editUserInput: EditUserInput) {
    const user: User = await this.getUserByEmail(email);

    if (!user) throw new Error('Usuario no encontrado');

    const updatedUser: User = await this.userRepository.save({
      ...user,
      ...editUserInput
    });

    return updatedUser;
  }

  async requestResetPassword(email: string) {
    try {
      const findUser: User = await this.getUserByEmail(email);
      if (!findUser) throw new Error('Usuario no encontrado');

      const resetToken = randomBytes(20).toString('hex')
      findUser.resetPasswordToken = resetToken;
      findUser.resetPasswordExpires = new Date(Date.now() + 3600000);

      this.userRepository.save(findUser);
      this.mailService.sendUserRecovery(findUser);
      console.log('Correo enviado');
      return {
        message: 'Se ha enviado un codigo a tu correo',
        data: findUser,
      };
    } catch (error) {
      throw new Error(String(error) + "INTERNAL ERROR");
    }
  }

  async resetPassword(resetPasswordInput: ResetPasswordInput) {
    try{
      const { email, resetPasswordToken, password } = resetPasswordInput;
      const findUser = await this.getUserByEmail(email);

      if (!findUser) throw new Error('Usuario no encontrado');


      if (findUser.resetPasswordToken == resetPasswordToken) {
        const hashPassword = await hash(password, 10);
        this.updateByEmail(email, {
          resetPasswordToken: null,
          password: hashPassword,
        });
        return {
          message: 'Contrasena cambiada exitosamente',
          data: findUser,
        };
      }
      return {
        message: 'Codigo incorrecto',
        data: findUser,
      };
    } catch (error) {
      throw new Error(String(error) + "INTERNAL ERROR");
    }
  }

  async getUserMeetByDate(id: number, date: string) {
    const user = await this.getUserById(id);
    if (!user) throw new Error('Usuario no encontrado');

    if(user.isProfessional) {
      const existDate = user.professionalMeets.find((meet) => meet.meetDate === date);
      const existTimeStart = user.professionalMeets.find((meet) => meet.startTime === date);

      if (existDate && existTimeStart) return false;
    } else {
      const existDate = user.userMeets.find((meet) => meet.meetDate === date);
      const existTimeStart = user.userMeets.find((meet) => meet.startTime === date);

      if (existDate && existTimeStart) return false;
    }
    return true;
  }

}