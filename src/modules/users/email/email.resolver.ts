import { Args, Query, Resolver } from '@nestjs/graphql';
import { EmailService } from './email.service';
import { User } from '../entities/user.entity';

@Resolver('passwordRecovery')
export class EmailResolver {
    constructor(
        private emailService: EmailService,
    ) { }

    @Query('sendUserRecovery')
    sendUserRecovery(@Args('userInput') user: User) {
        return this.emailService.sendUserRecovery(user);
    }
}
