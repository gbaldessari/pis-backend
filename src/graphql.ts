
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
    price: number;
}

export interface CreateCategoryinput {
    name: string;
}

export interface UpdateJobInput {
    jobName?: Nullable<string>;
    description?: Nullable<string>;
    idCategory?: Nullable<number>;
    requestsCount?: Nullable<number>;
    price?: Nullable<number>;
}

export interface CreateReviewInput {
    comment: string;
    rate: number;
    idJob: number;
}

export interface CreateMeetInput {
    idJob: number;
    meetDate: string;
    startTime: string;
    endTime: string;
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
    isProfessional?: Nullable<boolean>;
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
    price: number;
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
    data?: Nullable<Job>;
    success: boolean;
}

export interface QueryCategoryReturn {
    data?: Nullable<Category>;
    success: boolean;
}

export interface QueryByCategoryReturn {
    data?: Nullable<Nullable<Job>[]>;
    message: string;
    success: boolean;
}

export interface ExistReviewReturn {
    message: string;
    success: boolean;
}

export interface DefaultReturn {
    data?: Nullable<string>;
    message: string;
    success: boolean;
}

export interface DefaultReviewReturn {
    data?: Nullable<Review>;
    message: string;
    success: boolean;
}

export interface DefaultCategoryReturn {
    data?: Nullable<string>;
    message: string;
    success: boolean;
}

export interface RemoveReturn {
    message: string;
    success: boolean;
}

export interface QueryReviewJob {
    data?: Nullable<Nullable<Review>[]>;
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
    existReview(idJob: number): ExistReviewReturn | Promise<ExistReviewReturn>;
    getReviewById(id: number): DefaultReviewReturn | Promise<DefaultReviewReturn>;
    reviews(): Nullable<Review>[] | Promise<Nullable<Review>[]>;
    getReviewsByJob(idJob: number): QueryReviewJob | Promise<QueryReviewJob>;
    meets(): Nullable<Meet>[] | Promise<Nullable<Meet>[]>;
    meet(id: number): QueryMeetReturn | Promise<QueryMeetReturn>;
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    user(): User | Promise<User>;
    getUserMeets(): Nullable<Meet>[] | Promise<Nullable<Meet>[]>;
    totalSalesGenerated(): CalcReturn | Promise<CalcReturn>;
    totalSalesMonth(): CalcReturn | Promise<CalcReturn>;
    fiveFavoritesJobs(): ReturnFiveJobs | Promise<ReturnFiveJobs>;
    getAvailableTimes(date: string): Nullable<string>[] | Promise<Nullable<string>[]>;
}

export interface IMutation {
    createJob(createJobInput: CreateJobInput): DefaultReturn | Promise<DefaultReturn>;
    updateJob(jobName: string, updateJobInput: UpdateJobInput): DefaultReturn | Promise<DefaultReturn>;
    removeJob(id: number): RemoveReturn | Promise<RemoveReturn>;
    createCategory(createCategoryInput: CreateCategoryinput): DefaultCategoryReturn | Promise<DefaultCategoryReturn>;
    createReview(createReviewInput: CreateReviewInput): DefaultReviewReturn | Promise<DefaultReviewReturn>;
    removeReview(id: number): RemoveReturn | Promise<RemoveReturn>;
    createMeet(createMeetInput: CreateMeetInput): DefaultMeetReturn | Promise<DefaultMeetReturn>;
    finishMeet(idMeet: number): DefaultMeetReturn | Promise<DefaultMeetReturn>;
    removeMeet(id: number): RemoveMeetReturn | Promise<RemoveMeetReturn>;
    register(registerInput: RegisterInput): DefaultReturn | Promise<DefaultReturn>;
    login(loginInput: LoginInput): LoginReturn | Promise<LoginReturn>;
    editUser(editUserInput: EditUserInput): DefaultReturn | Promise<DefaultReturn>;
    requestPasswordReset(email: string): DefaultReturn | Promise<DefaultReturn>;
    resetPassword(resetPasswordInput: ResetPasswordInput): DefaultReturn | Promise<DefaultReturn>;
    verifyToken(): ReturnPayload | Promise<ReturnPayload>;
}

export interface Meet {
    id: number;
    idJob: Job;
    idProfessional: User;
    idUser: User;
    meetDate: string;
    startTime: string;
    endTime: string;
    isDone: boolean;
}

export interface QueryMeetReturn {
    data?: Nullable<Meet>;
    success: boolean;
}

export interface RemoveMeetReturn {
    message: string;
    success: boolean;
}

export interface DefaultMeetReturn {
    data?: Nullable<Meet>;
    message: string;
    success: boolean;
}

export interface DataLoginReturn {
    token: string;
    email: string;
}

export interface LoginReturn {
    data?: Nullable<DataLoginReturn>;
    message: string;
    success: boolean;
}

export interface CalcReturn {
    data?: Nullable<number>;
    message: string;
    success: boolean;
}

export interface MailReturn {
    message: string;
}

export interface ReturnPayload {
    id: number;
    email: string;
    isAdmin: boolean;
    iat: number;
    exp: number;
}

export interface ReturnFiveJobs {
    data: Nullable<Job>[];
    message: string;
    success: boolean;
}

type Nullable<T> = T | null;
