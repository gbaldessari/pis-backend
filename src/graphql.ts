
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

export interface CreateReviewInput {
    comment: string;
    rate: number;
    idJob: number;
    idUser: number;
}

export interface CreateMeetInput {
    idJob: number;
    idProfessional: number;
    idUser: number;
    meetDate: string;
    startTime: string;
    endTime: string;
}

export interface UserInput {
    id: number;
    username: string;
    email: string;
    password: string;
    phone: number;
    address: string;
    isProfessional?: Nullable<boolean>;
}

export interface RegisterInput {
    username: string;
    email: string;
    password: string;
    phone: number;
    address: string;
    isProfessional?: Nullable<boolean>;
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

export interface Review {
    id: number;
    comment: string;
    rate: number;
    idJob: Job;
    idUser: User;
}

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    phone: number;
    address: string;
    isProfessional?: Nullable<boolean>;
}

export interface Category {
    id: number;
    categoryName: string;
}

export interface QueryReturnJob {
    data: Job;
    success: boolean;
}

export interface QueryCategoryReturn {
    data: Category;
    success: boolean;
}

export interface QueryByCategoryReturn {
    data: Nullable<Job>[];
    message: string;
    success: boolean;
}

export interface ExistReviewReturn {
    message: string;
    success: boolean;
}

export interface DefaultReturn {
    data: string;
    message: string;
    success: boolean;
}

export interface DefaultReviewReturn {
    data: Review;
    message: string;
    success: boolean;
}

export interface DefaultCategoryReturn {
    data: string;
    message: string;
    success: boolean;
}

export interface RemoveReturn {
    message: string;
    success: boolean;
}

export interface IQuery {
    jobs(): Nullable<Job>[] | Promise<Nullable<Job>[]>;
    jobByName(name: string): QueryReturnJob | Promise<QueryReturnJob>;
    jobByCategory(category: string): QueryByCategoryReturn | Promise<QueryByCategoryReturn>;
    jobById(id: number): QueryReturnJob | Promise<QueryReturnJob>;
    categories(): Nullable<Category>[] | Promise<Nullable<Category>[]>;
    categoryById(id: number): QueryCategoryReturn | Promise<QueryCategoryReturn>;
    categoryByName(name: string): QueryCategoryReturn | Promise<QueryCategoryReturn>;
    existReview(idJob: number, idUser: number): ExistReviewReturn | Promise<ExistReviewReturn>;
    getReviewById(id: number): DefaultReviewReturn | Promise<DefaultReviewReturn>;
    reviews(): Nullable<Review>[] | Promise<Nullable<Review>[]>;
    meets(): Nullable<Meet>[] | Promise<Nullable<Meet>[]>;
    meet(id: number): QueryMeetReturn | Promise<QueryMeetReturn>;
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    userByEmail(email: string): QueryReturn | Promise<QueryReturn>;
    userById(id: number): QueryReturn | Promise<QueryReturn>;
    userMeetByDate(id: number, date: string): DefaultReturn | Promise<DefaultReturn>;
    totalSalesGenerated(id: number): CalcReturn | Promise<CalcReturn>;
    totalSalesMonth(id: number): CalcReturn | Promise<CalcReturn>;
    fiveFavoritesJobs(id: number): Nullable<Job>[] | Promise<Nullable<Job>[]>;
    getAvailableTimes(id: number, date: string): Nullable<string>[] | Promise<Nullable<string>[]>;
    sendUserRecovery(user: UserInput): MailReturn | Promise<MailReturn>;
}

export interface IMutation {
    createJob(createJobInput: CreateJobInput): DefaultReturn | Promise<DefaultReturn>;
    updateJob(jobName: string, updateJobInput: UpdateJobInput): DefaultReturn | Promise<DefaultReturn>;
    removeJob(id: number): RemoveReturn | Promise<RemoveReturn>;
    createCategory(createCategoryInput: CreateCategoryinput): DefaultCategoryReturn | Promise<DefaultCategoryReturn>;
    createReview(createReviewInput: CreateReviewInput): DefaultReviewReturn | Promise<DefaultReviewReturn>;
    createMeet(createMeetInput: CreateMeetInput): DefaultMeetReturn | Promise<DefaultMeetReturn>;
    finishMeet(id: string): DefaultMeetReturn | Promise<DefaultMeetReturn>;
    removeMeet(id: number): RemoveMeetReturn | Promise<RemoveMeetReturn>;
    register(registerInput: RegisterInput): DefaultReturn | Promise<DefaultReturn>;
    login(loginInput: LoginInput): LoginReturn | Promise<LoginReturn>;
    editUser(email: string, editUserInput: EditUserInput): DefaultReturn | Promise<DefaultReturn>;
    requestPasswordReset(email: string): DefaultReturn | Promise<DefaultReturn>;
    resetPassword(resetPasswordInput: ResetPasswordInput): DefaultReturn | Promise<DefaultReturn>;
    createUserSettings(userSettingsInput: UserSettingsInput): DefaultReturn | Promise<DefaultReturn>;
    verifyToken(): ReturnPayload | Promise<ReturnPayload>;
}

export interface Meet {
    id: number;
    idJob: Job;
    idProfessional: User;
    idClient: User;
    meetDate: string;
    startTime: string;
}

export interface QueryMeetReturn {
    data: Meet;
    success: boolean;
}

export interface RemoveMeetReturn {
    message: string;
    success: boolean;
}

export interface DefaultMeetReturn {
    data: Meet;
    message: string;
    success: boolean;
}

export interface UserSettings {
    userID: number;
    receiveEmails: boolean;
    receiveNotifications: boolean;
}

export interface DataLoginReturn {
    token: string;
    email: string;
}

export interface LoginReturn {
    data: DataLoginReturn;
    message: string;
    success: boolean;
}

export interface QueryReturn {
    data: User;
    success: boolean;
}

export interface CalcReturn {
    data: number;
    message: string;
    success: boolean;
}

export interface MailReturn {
    message: string;
}

export interface ReturnPayload {
    id: number;
    email: string;
    iat: number;
    exp: number;
}

type Nullable<T> = T | null;
