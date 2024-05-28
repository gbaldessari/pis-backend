import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "../entities/review.entity";
import { ReviewResolver } from "./review.resolver";
import { ReviewService } from "./review.service";
import { JobsModule } from "../jobs.module";
import { UsersModule } from "src/modules/users/users.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Review]),
        JobsModule,
        UsersModule
    ],
    providers: [ReviewResolver, ReviewService],
    exports: [ReviewService]
})
export class ReviewModule {}
export {ReviewService}