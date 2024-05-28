import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ReviewService } from "./review.service";
import { CreateReviewInput } from "../dto/create-review-input";

@Resolver('review')
export class ReviewResolver {
    constructor(
        private reviewService: ReviewService
    ) {}

    @Query('getReviewById')
    async getById(@Args('id') id: number) {
        return this.reviewService.getById(id);
    }

    @Query('reviews')
    async getReviews() {
        return this.reviewService.getReviews();
    }

    @Query('existReview')
    async existReview(@Args('idJob') idJob: number, @Args('idUser') idUser: number) {
        return this.reviewService.existReview(idJob, idUser);
    }

    @Mutation('createReview')
    async createReview(@Args('createReviewInput') createReviewInput: CreateReviewInput){
        return this.reviewService.createReview(createReviewInput);
    }

}