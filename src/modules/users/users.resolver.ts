import { 
    Args, 
    Mutation, 
    Query, 
    Resolver 
} from "@nestjs/graphql";
import { User } from "src/modules/users/entities/user.entity";
import { RegisterInput } from "./dto/register-input";
import { UserService } from "./users.service";
import { LoginInput } from "./dto/login-input";

@Resolver('User')
export class UserResolver {

    constructor(
        private userService: UserService,
    ) {}

    @Query('user')
    getUserByEmail(@Args('email') email: string) {
        return this.userService.getUserByEmail(email);
    }

    @Query('users')
    async getUsers() {
        return this.userService.getUsers();
    }

    @Mutation('login')
    login(@Args('loginInput') loginInput: LoginInput) {
        return this.userService.login(loginInput);
    }

    @Mutation('register')
    registerUser(@Args('registerInput') registerInput: RegisterInput) {
        return this.userService.register(registerInput);
    }
}


