// user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import { UserService } from 'src/modules/users/users.service';
import { User } from 'src/modules/users/entities/user.entity';

// Mock del UserRepository
class MockUserRepository extends Repository<User> { }

describe('UserService', () => {
    let service: UserService;
    let userRepository: MockUserRepository;
    let connection: Connection;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useClass: MockUserRepository,
                },
                {
                    provide: Connection,
                    useValue: {
                        transaction: jest.fn(),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        userRepository = module.get<MockUserRepository>(getRepositoryToken(User));
        connection = module.get<Connection>(Connection);
        jwtService = module.get<JwtService>(JwtService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('register', () => {
        it('should register a new user', async () => {
            // Mock UserRepository findOne method
            userRepository.findOne = jest.fn().mockResolvedValue(null);

            // Mock bcrypt hash method
            const mockHash = 'hashedPassword';
            jest.spyOn(hash, 'hash').mockResolvedValue(mockHash);

            // Mock UserRepository save method
            const mockUser = { id: 1, email: 'test@example.com' };
            userRepository.create = jest.fn().mockReturnValue(mockUser);
            userRepository.save = jest.fn().mockResolvedValue(mockUser);

            const registerInput = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                phone: 1234567890,
                address: '123 Test St',
            };

            const result = await service.register(registerInput);

            expect(result.success).toBeTruthy();
            expect(result.message).toBe('Usuario registrado');
            expect(result.data).toBe(mockUser.email);
        });

        it('should return error if user already exists', async () => {
            // Mock UserRepository findOne method to simulate existing user
            const existingUser = { id: 1, email: 'test@example.com' };
            userRepository.findOne = jest.fn().mockResolvedValue(existingUser);

            const registerInput = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                phone: 1234567890,
                address: '123 Test St',
            };

            const result = await service.register(registerInput);

            expect(result.success).toBeFalsy();
            expect(result.message).toBe('Usuario ya existe');
            expect(result.data).toBeNull();
        });
    });

    describe('login', () => {
        it('should login user with correct credentials', async () => {
            const loginInput = {
                email: 'test@example.com',
                password: 'password123',
            };

            const mockUser = {
                id: 1,
                email: 'test@example.com',
                password: await hash('password123', 10),
                isProfessional: false,
            };

            // Mock UserRepository findOne method to return mockUser
            userRepository.findOne = jest.fn().mockResolvedValue(mockUser);

            // Mock JwtService sign method
            const mockToken = 'mockToken';
            jwtService.sign = jest.fn().mockReturnValue(mockToken);

            const result = await service.login(loginInput);

            expect(result.success).toBeTruthy();
            expect(result.message).toBe('Sesión iniciada');
            expect(result.data.token).toBe(mockToken);
            expect(result.data.email).toBe(mockUser.email);
        });

        it('should return error if user not found', async () => {
            const loginInput = {
                email: 'nonexistent@example.com',
                password: 'password123',
            };

            // Mock UserRepository findOne method to simulate user not found
            userRepository.findOne = jest.fn().mockResolvedValue(null);

            const result = await service.login(loginInput);

            expect(result.success).toBeFalsy();
            expect(result.message).toBe('Usuario no encontrado');
            expect(result.data).toBeNull();
        });

        it('should return error if password is incorrect', async () => {
            const loginInput = {
                email: 'test@example.com',
                password: 'incorrectPassword',
            };

            const mockUser = {
                id: 1,
                email: 'test@example.com',
                password: await hash('password123', 10),
                isProfessional: false,
            };

            // Mock UserRepository findOne method to return mockUser
            userRepository.findOne = jest.fn().mockResolvedValue(mockUser);

            const result = await service.login(loginInput);

            expect(result.success).toBeFalsy();
            expect(result.message).toBe('Contraseña incorrecta');
            expect(result.data).toBeNull();
        });
    });
});
