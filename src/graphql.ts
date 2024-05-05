
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

export interface Role {
    exampleField?: Nullable<number>;
}

export interface IQuery {
    roles(): Nullable<Role>[] | Promise<Nullable<Role>[]>;
    role(id: number): Nullable<Role> | Promise<Nullable<Role>>;
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    user(email: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createRole(createRoleInput: CreateRoleInput): Role | Promise<Role>;
    updateRole(updateRoleInput: UpdateRoleInput): Role | Promise<Role>;
    removeRole(id: number): Nullable<Role> | Promise<Nullable<Role>>;
    register(registerInput: RegisterInput): RegisterReturn | Promise<RegisterReturn>;
    login(loginInput: LoginInput): LoginReturn | Promise<LoginReturn>;
    createUserSettings(userSettingsInput: UserSettingsInput): UserSettings | Promise<UserSettings>;
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

type Nullable<T> = T | null;
