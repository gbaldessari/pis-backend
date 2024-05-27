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
    try {
      return {
        data: await this.userRepository.findOneBy({email}),
        success: true
      }
    } catch (e) {
      return {
        data: null, 
        success: false
      };
    }
  }

  async getUserById(id:number){
    try {
      return {
        data: await this.userRepository.findOneBy({id}),
        success: true
      }
    } catch (e) {
      return {
        data: null, 
        success: false
      };
    }
  }

  async getUsers() {
    return this.userRepository.find({ relations: ['settings'] });
  }

  async login(loginInput: LoginInput) {
    try {
      const { email, password } = loginInput;
      const findUser: User = (await this.getUserByEmail(email)).data;

      if (!findUser) return {
        data: {token: null, email: null},
        message: 'Usuario no encontrado',
        success: false
      };

      const passwordMatch = await compare(password, findUser.password);
      if (!passwordMatch) return {
        data: {token: null, email: null},
        message: 'Contraseña incorrecta',
        success: false
      };

      const payload = { email: findUser.email, username: findUser.username };
      const access_token = this.jwtService.sign(payload);

      return {
        data: {token: access_token, email: findUser.email},
        message: 'Sesion iniciada',
        success: true
      };
    } catch (error) {
      throw new Error(String(error) + "INTERNAL ERROR");
    }
  }

  async register(registerInput: RegisterInput) {
    const exist: User = await this.userRepository.findOne({
      where: {
        email: registerInput?.email,
      },
    });

    if (exist) return {
      data: null,
      message: 'Usuario ya existe',
      success: false
    };

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
    return { 
      data: user.email, 
      message: 'Usuario registrado',
      success: true
    };
  }

  async updateByEmail(email: string, editUserInput: EditUserInput) {
    const user: User = (await this.getUserByEmail(email)).data;

    if (!user) return {
      data: null,
      message: 'Usuario no encontrado',
      success: false
    };

    const updatedUser: User = await this.userRepository.save({
      ...user,
      ...editUserInput
    });

    return {
      data: updatedUser.email,
      message: 'Usuario actualizado',
      success: true
    };
  }

  async requestResetPassword(email: string) {
    try {
      const findUser: User = (await this.getUserByEmail(email)).data;
      if (!findUser) return {
        data: null,
        message: 'Usuario no encontrado',
        success: false,
      }

      const resetToken = randomBytes(20).toString('hex')
      findUser.resetPasswordToken = resetToken;
      findUser.resetPasswordExpires = new Date(Date.now() + 3600000);

      this.userRepository.save(findUser);
      this.mailService.sendUserRecovery(findUser);
      console.log('Correo enviado');
      return {
        data: findUser.email,
        message: 'Se ha enviado un codigo a tu correo',
        success: true,
      };
    } catch (error) {
      throw new Error(String(error) + "INTERNAL ERROR");
    }
  }

  async resetPassword(resetPasswordInput: ResetPasswordInput) {
    try{
      const { email, resetPasswordToken, password } = resetPasswordInput;
      const findUser: User = (await this.getUserByEmail(email)).data;

      if (!findUser) return {
        data: null,
        message: 'Usuario no encontrado',
        success: false,
      }

      if (findUser.resetPasswordToken == resetPasswordToken) {
        const hashPassword = await hash(password, 10);
        this.updateByEmail(email, {
          resetPasswordToken: null,
          password: hashPassword,
        });
        return {
          data: findUser.email,
          message: 'Contrasena cambiada exitosamente',
          success: true,
        };
      }
      return {
        data: findUser.email,
        message: 'Codigo incorrecto',
        success: false,
      };
    } catch (error) {
      throw new Error(String(error) + "INTERNAL ERROR");
    }
  }

  async getUserMeetByDate(id: number, date: string) {
    const user: User = (await this.getUserById(id)).data;
    if (!user) return {
      data: null,
      message: 'Usuario no encontrado',
      success: false,
    }

    if(user.isProfessional) {
      const existDate = user.professionalMeets.find(
        (meet) => meet.meetDate === date);
      const existTimeStart = user.professionalMeets.find(
        (meet) => meet.startTime === date);

      if (existDate && existTimeStart) return {
        data: null,
        message: 'Ya existe una cita en esa fecha',
        success: false,
      };
    } else {
      const existDate = user.userMeets.find((meet) => meet.meetDate === date);
      const existTimeStart = user.userMeets.find((meet) => meet.startTime === date);

      if (existDate && existTimeStart) return {
        data: null,
        message: 'Ya existe una cita en esa fecha',
        success: false,
      };
    }

    return {
      data: user.email,
      message: 'Fecha disponible',
      success: true,
    };
  }

  async getTotalSalesGenerated(id: number){
    const findProfessional: User = (await this.getUserById(id)).data;
    if (!findProfessional || !findProfessional.isProfessional) return {
      data: null,
      message: 'Error al encontrar usuario profesional',
      success: false,
    }
    
    const totalSales = findProfessional.professionalMeets.reduce(
      (acc, meet) => acc + meet.idJob.price, 0);
    return {
      data: totalSales,
      message: 'Calculo exitoso',
      success: true,
    };
  }

  async getTotalSalesMonth(id: number){
    const findProfessional: User = (await this.getUserById(id)).data;
    if (!findProfessional || !findProfessional.isProfessional) return {
      data: null,
      message: 'Error al encontrar usuario profesional',
      success: false,
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const totalSales: number = findProfessional.professionalMeets
    .filter(meet => {
      const meetDate = new Date(meet.meetDate);
      return meet.isDone && meetDate >= startOfMonth && meetDate <= endOfMonth;
    })
    .reduce((acc, meet) => acc + meet.idJob.price, 0);

    return {
      data: totalSales,
      message: 'Calculo exitoso',
      success: true,
    };
  }

  async getFiveFavoritesJobs(id: number){
    const findProfessional: User = (await this.getUserById(id)).data;
    if (!findProfessional || !findProfessional.isProfessional) return {
      data: null,
      message: 'Error al encontrar usuario profesional',
      success: false,
    }

    const sortedJobs = findProfessional.jobs.sort(
      (a, b) => b.requestsCount - a.requestsCount);
    const topFiveJobs = sortedJobs.slice(0, 5);

    return {
      data: topFiveJobs,
      message: 'Calculo exitoso',
      success: true,
    };
  }

  async showAvailableTimes(id: number, date: string){
    const findProfessional: User = (await this.getUserById(id)).data;
    if (!findProfessional || !findProfessional.isProfessional) return {
      data: null,
      message: 'Error al encontrar usuario profesional',
      success: false,
    }

    const meetDate = new Date(date);

    let times: string[] = [];
    for (let i = 8; i <= 20; i++) {
      times.push(i + ':00');
    }

    const day = findProfessional.professionalMeets.filter(
      meet => new Date(meet.meetDate).toDateString() === meetDate.toDateString());

    day.forEach(meet => {
      const startHour = parseInt(meet.startTime.split(':')[0]);
      times = times.filter(time => time !== startHour + ':00');
    });

    return {
      data: times,
      message: 'Horas disponibles retornadas',
      success: true,
    };
  }

}