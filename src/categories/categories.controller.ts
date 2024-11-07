import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { Roles } from 'src/auth/roles-auth.decorator'
import { RolesGuard } from 'src/auth/roles.guard'
import { CreateCategoryDto } from './dto/create-category.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Controller('api/categories')
export class CategoriesController {
	constructor(private categoriesService: CategoriesService) {}

	@Get()
	async getAllCategories() {
		return this.categoriesService.getAllCategories()
	}

	@Get(':categoryId')
	async getCategoryById(@Param('categoryId') categoryId: number) {
		return this.categoriesService.getCategoryById(categoryId)
	}

	@Get('categoryId/posts')
	async getPostsByCategoryId(@Param('categoryId') categoryId: number) {
		return this.categoriesService.getPostsByCategory(categoryId)
	}

	@Post()
	@Roles('ADMIN')
	@UseGuards(RolesGuard, JwtAuthGuard)
	async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
		return this.categoriesService.createCategory(createCategoryDto)
	}

	@Patch(':categoryId')
	@Roles('ADMIN')
	@UseGuards(RolesGuard, JwtAuthGuard)
	async updateCategory(
		@Param('categoryId') categoryId: number,
		@Body() updateCategoryDto: UpdateCategoryDto
	) {
		return this.categoriesService.updateCategory(categoryId, updateCategoryDto)
	}

	@Delete(':categoryId')
	@Roles('ADMIN')
	@UseGuards(RolesGuard, JwtAuthGuard)
	async deleteCategory(@Param('categoryId') categoryId: number) {
		return this.categoriesService.deleteCategory(categoryId)
	}
}
