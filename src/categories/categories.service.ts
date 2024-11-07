import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { Post } from 'src/posts/posts.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectModel(Category) private categoryRepository: typeof Category,
        @InjectModel(Post) private postRepository: typeof Post,
    ) {}

    async getAllCategories() {
        return this.categoryRepository.findAll();
    }

    async getCategoryById(categoryId: number) {
        const category = await this.categoryRepository.findByPk(categoryId)
        if (!category) {
            throw new NotFoundException('Category not found')
        }
        return category;
    }

    async getPostsByCategory(categoryId: number) {
        const category = this.categoryRepository.findByPk(categoryId);
        if (!category) {
            throw new NotFoundException('Category not found')
        }
        return this.postRepository.findAll({ where: { categoryId: (await category).id} })
    }

    async createCategory(dto: CreateCategoryDto) {
        return this.categoryRepository.create(dto);
    }

    async updateCategory(categoryId: number, dto: UpdateCategoryDto) {
        const category = await this.categoryRepository.findByPk(categoryId);
        if (!category) {
            throw new NotFoundException('Category not found')
        }
        return category.update(dto);
    }

    async deleteCategory(id: number) {
        const category = await this.categoryRepository.findByPk(id);
        if (!category) {
            throw new NotFoundException('Category not found')
        }
        await category.destroy();
    }

}
