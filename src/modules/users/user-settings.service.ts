import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { UserSetting } from 'src/modules/users/entities/user-settings.entity';
import { UserSettingsInput } from 'src/modules/users/dto/user-settings-input';
import { Repository } from 'typeorm';

@Injectable()
export class UserSettingsService {
    constructor (
        @InjectRepository(UserSetting)
        private userSettingsRepository: Repository<UserSetting>,
        @InjectRepository(User) 
        private userRepository: Repository<User>
    ) {}

    getUserSettingsById(userID: number) {
        return this.userSettingsRepository.findOneBy({userID});
    }

    async createUserSettings(userSettingsInput: UserSettingsInput) {
        const findUser = await this.userRepository.findOneBy({id: userSettingsInput.userID});

        if (!findUser) throw new Error('Usuario no encontrado');

        const userSetting = this.userSettingsRepository.create(userSettingsInput);
        const savedSettings = await this.userSettingsRepository.save(userSetting);

        findUser.settings = savedSettings;
        await this.userRepository.save(findUser);

        return savedSettings;
    }

}