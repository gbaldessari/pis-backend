import { 
    Args, 
    Mutation, 
    Query, 
    Resolver 
} from "@nestjs/graphql";
import { RegisterInput } from "./dto/register-input";
import { UserService } from "./users.service";
import { LoginInput } from "./dto/login-input";
import { ResetPasswordInput } from "./dto/reset-password-input";
import { EditUserInput } from "./dto/edit-user-input";

@Resolver('User')
export class UserResolver {

    constructor(
        private userService: UserService,
    ) {}

    @Query('userByEmail')
    async getUserByEmail(@Args('email') email: string) {
        return this.userService.getUserByEmail(email);
    }

    @Query('userById')
    async getUserById(@Args('id') id:number){
        return this.userService.getUserById(id);
    }

    @Query('users')
    async getUsers() {
        return this.userService.getUsers();
    }

    @Query('userMeetByDate')
    async getUserMeetByDate(@Args('id') id:number, @Args('date') date: string){
        return this.userService.getUserMeetByDate(id,date);
    }

    @Query('totalSalesGenerated')
    async getTotalSalesGenerated(@Args('id') id:number){
        return this.userService.getTotalSalesGenerated(id);
    }

    @Query('totalSalesMonth')
    async getTotalSalesMonth(@Args('id') id:number){
        return this.userService.getTotalSalesMonth(id);
    }

    @Query('fiveFavoritesJobs')
    async getFiveFavoritesJobs(@Args('id') id:number){
        return this.userService.getFiveFavoritesJobs(id);
    }

    @Mutation('login')
    login(@Args('loginInput') loginInput: LoginInput) {
        return this.userService.login(loginInput);
    }

    @Mutation('register')
    registerUser(@Args('registerInput') registerInput: RegisterInput) {
        return this.userService.register(registerInput);
    }

    @Mutation('editUser')
    updateByEmail(@Args('email') email:string, @Args('editUserInput') editUserInput: EditUserInput) {
        return this.userService.updateByEmail(email, editUserInput);
    }

    @Mutation('requestPasswordReset')
    requestResetPassword(@Args('email') email:string){
        return this.userService.requestResetPassword(email);
    }

    @Mutation('resetPassword')
    resetPassword(@Args('resetPasswordInput') resetPasswordInput: ResetPasswordInput){
        return this.userService.resetPassword(resetPasswordInput);
    }

}


