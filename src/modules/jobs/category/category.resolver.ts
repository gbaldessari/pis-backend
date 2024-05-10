import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CategoryService } from "./category.service";
import { CreateCategoryInput } from "../dto/create-category-input";

@Resolver('category')
export class CategoryResolver {
    constructor (
        private categoryService:CategoryService
    ) {}

    @Query('categoryById')
    getById(@Args('id') id:number){
        return this.categoryService.getById(id);
    }

    @Query('categoryByName')
    getByName(@Args('name') name: string){
        return this.categoryService.getByName(name);
    }

    @Mutation('createCategory')
    createCategory(
        @Args('createCategoryInput') createCategoryInput:CreateCategoryInput
    ){
        return this.categoryService.createCategory(createCategoryInput);
    }

}