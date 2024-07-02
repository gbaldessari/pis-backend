import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
    imports: [
      TypeOrmModule.forFeature([Category]), 
      UsersModule
    ],
    providers: [CategoryResolver, CategoryService],
    exports: [CategoryService]
  })
  export class CategoryModule {}
  
  export {CategoryService}