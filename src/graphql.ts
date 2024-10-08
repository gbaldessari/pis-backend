
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

export interface AvaibleTimesInput {
    idProfessional: number;
    date: string;
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
    job: Job;
    user: User;
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

export interface DefaultReviewReturn {
    data?: Nullable<Review>;
    message: string;
    success: boolean;
}

export interface IQuery {
    jobs(): Nullable<Nullable<Job>[]> | Promise<Nullable<Nullable<Job>[]>>;
    jobByName(name: string): QueryReturnJob | Promise<QueryReturnJob>;
    jobByCategory(category: string): ReturnJobs | Promise<ReturnJobs>;
    jobById(id: number): QueryReturnJob | Promise<QueryReturnJob>;
    categories(): Nullable<Nullable<Category>[]> | Promise<Nullable<Nullable<Category>[]>>;
    categoryById(id: number): ReturnJobs | Promise<ReturnJobs>;
    categoryByName(name: string): ReturnJobs | Promise<ReturnJobs>;
    existReview(idJob: number): MessageReturn | Promise<MessageReturn>;
    getReviewById(id: number): DefaultReviewReturn | Promise<DefaultReviewReturn>;
    reviews(): Nullable<Nullable<Review>[]> | Promise<Nullable<Nullable<Review>[]>>;
    getReviewsByJob(id: number): ReturnReviews | Promise<ReturnReviews>;
    meets(): Nullable<Nullable<Meet>[]> | Promise<Nullable<Nullable<Meet>[]>>;
    meet(id: number): QueryMeetReturn | Promise<QueryMeetReturn>;
    users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    user(): ReturnUser | Promise<ReturnUser>;
    getUserMeets(): ReturnMeets | Promise<ReturnMeets>;
    totalSalesGenerated(): CalcReturn | Promise<CalcReturn>;
    totalSalesMonth(): CalcReturn | Promise<CalcReturn>;
    fiveFavoritesJobs(): ReturnJobs | Promise<ReturnJobs>;
    getAvailableTimes(avaibleTimesInput: AvaibleTimesInput): ReturnTimes | Promise<ReturnTimes>;
    getUserReviews(): ReturnReviews | Promise<ReturnReviews>;
    getProfessionalJobs(): ReturnJobs | Promise<ReturnJobs>;
    getUserChats(): ReturnUsers | Promise<ReturnUsers>;
    getProfessionalMeets(): ReturnMeets | Promise<ReturnMeets>;
}

export interface IMutation {
    createJob(createJobInput: CreateJobInput): DefaultReturn | Promise<DefaultReturn>;
    updateJob(jobName: string, updateJobInput: UpdateJobInput): DefaultReturn | Promise<DefaultReturn>;
    removeJob(id: number): MessageReturn | Promise<MessageReturn>;
    createCategory(createCategoryInput: CreateCategoryinput): DefaultReturn | Promise<DefaultReturn>;
    createReview(createReviewInput: CreateReviewInput): DefaultReviewReturn | Promise<DefaultReviewReturn>;
    removeReview(id: number): MessageReturn | Promise<MessageReturn>;
    createMeet(createMeetInput: CreateMeetInput): DefaultMeetReturn | Promise<DefaultMeetReturn>;
    finishMeet(idMeet: number): DefaultMeetReturn | Promise<DefaultMeetReturn>;
    removeMeet(id: number): MessageReturn | Promise<MessageReturn>;
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

export interface MessageReturn {
    message: string;
    success: boolean;
}

export interface DefaultMeetReturn {
    data?: Nullable<Meet>;
    message: string;
    success: boolean;
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

export interface DefaultReturn {
    data?: Nullable<string>;
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

export interface ReturnJobs {
    data?: Nullable<Nullable<Job>[]>;
    message: string;
    success: boolean;
}

export interface ReturnUser {
    data?: Nullable<User>;
    success: boolean;
}

export interface ReturnMeets {
    data?: Nullable<Nullable<Meet>[]>;
    message: string;
    success: boolean;
}

export interface ReturnTimes {
    data?: Nullable<Nullable<string>[]>;
    message: string;
    success: boolean;
}

export interface ReturnReviews {
    data?: Nullable<Nullable<Review>[]>;
    message: string;
    success: boolean;
}

export interface ReturnUsers {
    data?: Nullable<Nullable<User>[]>;
    message: string;
    success: boolean;
}

type Nullable<T> = T | null;
