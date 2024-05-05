import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { RegisterInput } from 'src/modules/users/dto/register-input'
import { Repository, Connection, EntityManager } from 'typeorm';
import { HttpStatus } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { LoginInput } from './dto/login-input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
      @InjectRepository(User) 
      private userRepository: Repository<User>,
      private connection: Connection,
      private jwtService: JwtService
    ) {}

    getUserByEmail(email: string) {
      return this.userRepository.findOneBy({email});
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
    
        const payload = { email: findUser.email, username: findUser.username};
        const access_token = this.jwtService.sign(payload);
    
        return { user: findUser, token: access_token };
      } catch (error) {
        throw new Error(String(error));
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
      registerInput = {...registerInput, password: hashedPassword};
      
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

}