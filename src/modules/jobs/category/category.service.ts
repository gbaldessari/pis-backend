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

    async getCategories(){
        return await this.categoryRepository.find();
    }

    async getById(id:number){
        return await this.categoryRepository.findOneBy({id});
    }

    async getByName(name:string){
        return await this.categoryRepository.findOneBy({categoryName: name})
    }

    async createCategory(createCategoryInput: CreateCategoryInput){
        const exist = await this.getByName(createCategoryInput.name)

        console.log(exist)

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