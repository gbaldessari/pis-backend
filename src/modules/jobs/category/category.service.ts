import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from '../dto/create-category-input';
import { Connection, EntityManager } from 'typeorm';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class CategoryService {
    constructor (
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        private connection: Connection,
    ) {}

    async getById(id:number){
        return await this.categoryRepository.findOne({where: {id: id}});
    }

    async getByName(name:string){
        return await this.categoryRepository.findOne({where: {categoryName: name}})
    }

    async createCategory(createCategoryInput: CreateCategoryInput){
        const exist = this.getByName(createCategoryInput.name)

        if(exist) throw new Error('Esta categoria ya existe')
        
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
        return {category: category, message: "Categoría creado"}
    }

}