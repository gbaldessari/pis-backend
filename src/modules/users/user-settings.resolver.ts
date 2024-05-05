import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserSettingsInput } from "./dto/user-settings-input";
import { UserSettingsService } from "src//modules/users/user-settings.service";

@Resolver('UserSetting')
export class UserSettingsResolver {
    constructor(
        private userSettingsService: UserSettingsService,
    ) {}
    
    @Mutation('createUserSettings')
    async createUserSettings(
        @Args('userSettings') userSettingsInput: UserSettingsInput,
    ) {
        const userSetting = await this.userSettingsService.createUserSettings(userSettingsInput);
        return userSetting;
    }
}