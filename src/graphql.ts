
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateJobInput {
    jobName: string;
    description: string;
    idCategory: number;
    idProfessional: number;
}

export interface CreateCategoryinput {
    name: string;
}

export interface UpdateJobInput {
    jobName?: Nullable<string>;
    description?: Nullable<string>;
    idCategory?: Nullable<number>;
    idProfessional?: Nullable<number>;
}

export interface CreateMeetInput {
    exampleField?: Nullable<number>;
}

export interface UpdateMeetInput {
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
    resetPasswordToken: string;
    password: string;
}

export interface Job {
    id: number;
    jobName: string;
    description: string;
    averageRate: number;
    idCategory: Category;
    idProfessional: User;
    requestsCount: number;
}

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    phone: number;
    address: string;
}

export interface Category {
    id: number;
    categoryName: string;
}

export interface CreateJobReturn {
    job: Job;
    message: string;
}

export interface UpdateJobReturn {
    job: Job;
    message: string;
}

export interface RemoveJobReturn {
    message: string;
}

export interface CreateCategoryReturn {
    category: Category;
    message: string;
}

export interface IQuery {
    jobs(): Nullable<Job>[] | Promise<Nullable<Job>[]>;
    jobByName(name: string): Nullable<Job> | Promise<Nullable<Job>>;
    jobByCategory(category: string): Nullable<Job> | Promise<Nullable<Job>>;
    categories(): Nullable<Category>[] | Promise<Nullable<Category>[]>;
    categoryById(id: number): Nullable<Category> | Promise<Nullable<Category>>;
    categoryByName(name: string): Nullable<Category> | Promise<Nullable<Category>>;
    meets(): Nullable<Meet>[] | Promise<Nullable<Meet>[]>;
    meet(id: number): Nullable<Meet> | Promise<Nullable<Meet>>;
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    userByEmail(email: string): Nullable<User> | Promise<Nullable<User>>;
    userById(id: number): Nullable<User> | Promise<Nullable<User>>;
    sendUserRecovery(user: UserInput): MailReturn | Promise<MailReturn>;
}

export interface IMutation {
    createJob(createJobInput: CreateJobInput): CreateJobReturn | Promise<CreateJobReturn>;
    updateJob(jobName: string, updateJobInput: UpdateJobInput): UpdateJobReturn | Promise<UpdateJobReturn>;
    removeJob(id: number): RemoveJobReturn | Promise<RemoveJobReturn>;
    createCategory(createCategoryInput: CreateCategoryinput): CreateCategoryReturn | Promise<CreateCategoryReturn>;
    createMeet(createMeetInput: CreateMeetInput): Meet | Promise<Meet>;
    updateMeet(updateMeetInput: UpdateMeetInput): Meet | Promise<Meet>;
    removeMeet(id: number): Nullable<Meet> | Promise<Nullable<Meet>>;
    register(registerInput: RegisterInput): RegisterReturn | Promise<RegisterReturn>;
    login(loginInput: LoginInput): LoginReturn | Promise<LoginReturn>;
    createUserSettings(userSettingsInput: UserSettingsInput): UserSettings | Promise<UserSettings>;
    editUser(email: string, editUserInput: EditUserInput): User | Promise<User>;
    requestPasswordReset(email: string): ResetPasswordReturn | Promise<ResetPasswordReturn>;
    resetPassword(resetPasswordInput: ResetPasswordInput): ResetPasswordReturn | Promise<ResetPasswordReturn>;
}

export interface Meet {
    exampleField?: Nullable<number>;
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
