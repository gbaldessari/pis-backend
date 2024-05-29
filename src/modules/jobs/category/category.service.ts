import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryInput } from '../dto/create-category-input';
import { Connection, EntityManager, Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class CategoryService {
    constructor (
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        private connection: Connection,
    ) {}

    async getCategories(){
        return await this.categoryRepository.find();
    }

    async getById(id:number){
        try {
            return {
                data: await this.categoryRepository.findOneBy({id}),
                success: true
            } 
        } catch(e) {
            return {
                data: null,
                success: false
            }
        }
    }

    async getByName(name:string){
        try {
            return {
                data: await this.categoryRepository.findOneBy({categoryName: name}),
                success: true
            } 
        } catch(e) {
            return {
                data: null,
                success: false
            }
        }
    }

    async createCategory(createCategoryInput: CreateCategoryInput){
        const exist = await this.getByName(createCategoryInput.name)

        if(exist) return {
            data: null,
            message: 'Categoria ya existe',
            success: false
        }
        
        const categoryInput = {
            categoryName: createCategoryInput.name,
        };
        let category: Category;
        await this.connection.transaction(
            async (transactionalEntityManager: EntityManager): Promise<void> => {
                try {
                category = this.categoryRepository.create(categoryInput);
                await transactionalEntityManager.save(category);
                } catch (error: unknown) {
                throw new Error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
                }
            },
        );
        return {
            data: category.categoryName,
            message: 'Categoria creada',
            success: true
        }
    }

}