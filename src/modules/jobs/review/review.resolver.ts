import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ReviewService } from "./review.service";
import { CreateReviewInput } from "../dto/create-review-input";
import { Context } from "@nestjs/graphql";
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../users/guard/auth.guard';

@Resolver('review')
export class ReviewResolver {
    constructor(
        private reviewService: ReviewService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Query('getReviewById')
    async getById(@Args('id') id: number) {
        try {
            return await this.reviewService.getById(id);
        } catch (e) {
            throw new Error("INTERNAL_SERVER_ERROR" + e);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Query('reviews')
    async getReviews() {
        try {
            return await this.reviewService.getReviews();
        } catch (e) {
            throw new Error("INTERNAL_SERVER_ERROR" + e);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Query('existReview')
    async existReview(
        @Context() context: any,
        @Args('idJob') idJob: number
    ) {
        try {
            const id: number = context.req.user.id;
            return await this.reviewService.existReview(id, idJob);
        } catch (e) {
            throw new Error("INTERNAL_SERVER_ERROR" + e);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Mutation('createReview')
    async createReview(
        @Context() context: any,
        @Args('createReviewInput') createReviewInput: CreateReviewInput
    ){
        try {
            const id: number = context.req.user.id;
            return await this.reviewService.createReview(id, createReviewInput);
        } catch (e) {
            throw new Error("INTERNAL_SERVER_ERROR" + e);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Mutation('removeReview')
    async removeReview(@Args('id') id: number) {
        try {
            return await this.reviewService.removeReview(id);
        } catch (e) {
            throw new Error("INTERNAL_SERVER_ERROR" + e);
        }
    }

}