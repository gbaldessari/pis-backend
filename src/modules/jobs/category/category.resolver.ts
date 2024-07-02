import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CategoryService } from "./category.service";
import { CreateCategoryInput } from "../dto/create-category-input";
import { JwtAuthGuard } from "src/modules/users/guard/auth.guard";
import { UseGuards } from "@nestjs/common";

@Resolver('category')
export class CategoryResolver {
    constructor (
        private categoryService:CategoryService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Query('categories')
    async  getCategories() {
        try {
            return await this.categoryService.getCategories();
        } catch (e) {
            throw new Error("INTERNAL_SERVER_ERROR" + e);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Query('categoryById')
    async getById(@Args('id') id:number){
        try {
            return await this.categoryService.getById(id);
        } catch (e) {
            throw new Error("INTERNAL_SERVER_ERROR" + e);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Query('categoryByName')
    async getByName(@Args('name') name: string){
        try {
            return await this.categoryService.getByName(name);
        } catch (e) {
            throw new Error("INTERNAL_SERVER_ERROR" + e);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Mutation('createCategory')
    async createCategory(
        @Args('createCategoryInput') createCategoryInput:CreateCategoryInput
    ){
        try {
            return await this.categoryService.createCategory(createCategoryInput);
        } catch (e) {
            throw new Error("INTERNAL_SERVER_ERROR" + e);
        }
    }
    
}