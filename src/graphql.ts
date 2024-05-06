
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateRoleInput {
    exampleField?: Nullable<number>;
}

export interface UpdateRoleInput {
    id: number;
}

export interface UserInput {
    id: number;
    username: string;
    email: string;
    password: string;
    phone: number;
    address: string;
}

export interface RegisterInput {
    username: string;
    email: string;
    password: string;
    phone: number;
    address: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface UserSettingsInput {
    userID: number;
    receiveEmails: boolean;
    receiveNotifications: boolean;
}

export interface EditUserInput {
    username?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    phone?: Nullable<number>;
    address?: Nullable<string>;
}

export interface ResetPasswordInput {
    email: string;
    reset_token: string;
    password: string;
}

export interface Role {
    exampleField?: Nullable<number>;
}

export interface IQuery {
    roles(): Nullable<Role>[] | Promise<Nullable<Role>[]>;
    role(id: number): Nullable<Role> | Promise<Nullable<Role>>;
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    user(email: string): Nullable<User> | Promise<Nullable<User>>;
    sendUserRecovery(user: UserInput): MailReturn | Promise<MailReturn>;
}

export interface IMutation {
    createRole(createRoleInput: CreateRoleInput): Role | Promise<Role>;
    updateRole(updateRoleInput: UpdateRoleInput): Role | Promise<Role>;
    removeRole(id: number): Nullable<Role> | Promise<Nullable<Role>>;
    register(registerInput: RegisterInput): RegisterReturn | Promise<RegisterReturn>;
    login(loginInput: LoginInput): LoginReturn | Promise<LoginReturn>;
    createUserSettings(userSettingsInput: UserSettingsInput): UserSettings | Promise<UserSettings>;
    editUser(email: string, editUserInput: EditUserInput): User | Promise<User>;
    requestPasswordReset(email: string): ResetPasswordReturn | Promise<ResetPasswordReturn>;
    resetPassword(resetPasswordInput: ResetPasswordInput): ResetPasswordReturn | Promise<ResetPasswordReturn>;
}

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    phone: number;
    address: string;
}

export interface UserSettings {
    userID: number;
    receiveEmails: boolean;
    receiveNotifications: boolean;
}

export interface LoginReturn {
    user: User;
    token: string;
}

export interface RegisterReturn {
    user: User;
    message: string;
}

export interface ResetPasswordReturn {
    message: string;
    data: User;
}

export interface MailReturn {
    message: string;
}

type Nullable<T> = T | null;
