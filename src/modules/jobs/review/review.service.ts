import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from '../entities/review.entity';
import { Repository, Connection, EntityManager } from 'typeorm';
import { JobsService } from '../jobs.service';
import { Job } from '../entities/job.entity';
import { CreateReviewInput } from '../dto/create-review-input';
import { User } from 'src/graphql';
import { UserService } from 'src/modules/users/users.service';

@Injectable()
export class ReviewService {
    constructor (
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,
        private jobService: JobsService,
        private userService: UserService,
        private connection: Connection,
    ) {}

    async getReviews() {
        try {
            return await this.reviewRepository.find();
        } catch(e) {
            return null;
        }
    }

    async getById(id: number) {
        try {
            return {
                data: await this.reviewRepository.findOneBy({id}),
                message: 'Review encontrada',
                success: true
            }
        } catch (e) {
            return {
                data: null,
                message: 'Review no encontrada',
                success: false
            }
        }
    }

    async existReview(id: number, idJob: number) {
        const job: Job = (
            await this.jobService.getById(idJob)
        ).data;

        const user: User = (
            await this.userService.getUserById(id)
        ).data;

        const existJob = await this.reviewRepository.findOneBy({job});

        const existUser = await this.reviewRepository.findOneBy({user});

        if(existJob === existUser) {
            return {
                message: 'Review encontrada',
                success: true
            }
        } else {        
            return {
                message: 'Review no existe',
                success: false
            }
        }
    }

    async createReview(id: number, createReviewInput: CreateReviewInput) {
        console.log(createReviewInput);

        const job: Job = (
            await this.jobService.getById(createReviewInput.idJob)
        ).data;

        if (!job) return {
            data: null,
            message: 'Trabajo no encontrado',
            success: false
        }

        const user: User = (
            await this.userService.getUserById(id)
        ).data;

        if (!user) return {
            data: null,
            message: 'Usuario no encontrado',
            success: false
        }

        if (job.idProfessional.id === user.id) return {
            data: null,
            message: 'No puedes hacer review a tu propio trabajo',
            success: false
        }

        if ((await this.existReview(id, job.id)).success) return {
            data: null,
            message: 'Review de este usuario ya existe',
            success: false
        }

        const reviewInput = {
            comment: createReviewInput.comment,
            rate: createReviewInput.rate,
            job: job,
            user: user
        }

        let review: Review;
        await this.connection.transaction(
            async (transactionalEntityManager: EntityManager): Promise<void> => {
                try {
                    review = this.reviewRepository.create(reviewInput);
                    await transactionalEntityManager.save(job);
                } catch (error: unknown) {
                    throw new Error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
                }
            },
        );

        return {
            data: review,
            message: 'Review creada',
            success: true
        } 
    }

    async removeReview(id: number) {
        const review = await this.getById(id);
        if (!review.success) return {
            message: 'Review no encontrada',
            success: false
        }

        await this.reviewRepository.remove(review.data);
        return {
            message: 'Review eliminada',
            success: true
        }
    }
}