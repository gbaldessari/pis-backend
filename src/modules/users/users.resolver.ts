import { 
    Args, 
    Context, 
    Mutation, 
    Query, 
    Resolver 
} from "@nestjs/graphql";
import { RegisterInput } from "./dto/register-input";
import { UserService } from "./users.service";
import { LoginInput } from "./dto/login-input";
import { ResetPasswordInput } from "./dto/reset-password-input";
import { EditUserInput } from "./dto/edit-user-input";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "./guard/auth.guard";

@Resolver('User')
export class UserResolver {

    constructor(
        private userService: UserService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Mutation('verifyToken')
    async verifyToken(@Context() context: any) {
        const req = context.req;
        return await req.user;
    }
    
    @UseGuards(JwtAuthGuard)
    @Query('users')
    async getUsers(@Context() context: any) {
        try {
            const id: number = context.req.user.id;
            return await this.userService.getUsers(id);
        } catch(e) {
            throw new Error("INTERNAL_SERVER_ERROR" + e);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Query('user')
    async getUserById(@Context() context: any){
        try {
            const id: number = context.req.user.id;
            return await this.userService.getUserById(id);
        } catch (e) {
            throw new Error("INTERNAL_SERVER_ERROR" + e);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Query('getUserMeets')
    async getUserMeets(@Context() context: any){
        try {
            const id: number = context.req.user.id;
            return await this.userService.getUserMeets(id);
        } catch (e) {
            throw new Error("INTERNAL_SERVER_ERROR" + e);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Query('totalSalesGenerated')
    async getTotalSalesGenerated(@Context() context: any){
        try {
            const id: number = context.req.user.id;
            return await this.userService.getTotalSalesGenerated(id);
        } catch (e) {
            throw new Error("INTERNAL_SERVER_ERROR" + e);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Query('totalSalesMonth')
    async getTotalSalesMonth(@Context() context: any){
        const id: number = context.req.user.id;
        try {
            return await this.userService.getTotalSalesMonth(id);
        } catch (e) {
            throw new Error("INTERNAL_SERVER_ERROR" + e);
    }
}

    @UseGuards(JwtAuthGuard)
    @Query('fiveFavoritesJobs')
    async getFiveFavoritesJobs(@Context() context: any){
        try {
            const id: number = context.req.user.id;
            return await this.userService.getFiveFavoritesJobs(id);
        } catch (e) {
            throw new Error("INTERNAL_SERVER_ERROR" + e);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Query('getAvailableTimes')
    async getAvailableTimes(
        @Context() context: any, 
        @Args('date') date: string
    ){
        try {
            const id: number = context.req.user.id;
            return await this.userService.showAvailableTimes(id, date);
        } catch (e) {
            throw new Error("INTERNAL_SERVER_ERROR" + e);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Query('getUserReviews')
    async getUserReviews(
        @Context() context: any,
    ){
        try {
            const id: number = context.req.user.id;
            return await this.userService.getUserReviews(id);
        } catch (e) {
            throw new Error("INTERNAL_SERVER_ERROR" + e);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Query('getProfessionalJobs')
    async getProfessionalJobs(
        @Context() context: any,
    ){
        try {
            const id: number = context.req.user.id;
            return await this.userService.getProfessionalJobs(id);
        } catch (e) {
            throw new Error("INTERNAL_SERVER_ERROR" + e);
        }
    }

    @Mutation('login')
    async login(@Args('loginInput') loginInput: LoginInput) {
        try {
            return await this.userService.login(loginInput);
        } catch (e) {
            throw new Error("INTERNAL_SERVER_ERROR" + e);
        }
    }

    @Mutation('register')
    async registerUser(@Args('registerInput') registerInput: RegisterInput) {
        try {
            return await this.userService.register(registerInput);
        } catch (e) {
            throw new Error("INTERNAL_SERVER_ERROR" + e);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Mutation('editUser')
    async updateUser(
        @Context() context: any,
        @Args('editUserInput') editUserInput: EditUserInput
    ) {
        try {
            const id: number = context.req.user.id;
            return await this.userService.updateUser(id, editUserInput);
        } catch (e) { 
            throw new Error("INTERNAL_SERVER_ERROR" + e);
        }
    }

    @Mutation('requestPasswordReset')
    async requestResetPassword(@Args('email') email:string){
        try {
            return await this.userService.requestResetPassword(email);
        } catch (e) {
            throw new Error("INTERNAL_SERVER_ERROR" + e);
        }
    }

    @Mutation('resetPassword')
    async resetPassword(
        @Args('resetPasswordInput') resetPasswordInput: ResetPasswordInput
    ){
        try {
            return await this.userService.resetPassword(resetPasswordInput);
        } catch (e) {
            throw new Error("INTERNAL_SERVER_ERROR" + e);
        }
    }

}


