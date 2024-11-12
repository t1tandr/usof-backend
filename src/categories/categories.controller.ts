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
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'

@ApiTags('Categories')
@Controller('api/categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all categories.',
  })
  async getAllCategories() {
    return this.categoriesService.getAllCategories()
  }

  @Get(':categoryId')
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiParam({
    name: 'categoryId',
    description: 'ID of the category to retrieve',
  })
  @ApiResponse({ status: 200, description: 'Successfully retrieved category.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  async getCategoryById(@Param('categoryId') categoryId: number) {
    return this.categoriesService.getCategoryById(categoryId)
  }

  @Get(':categoryId/posts')
  @ApiOperation({ summary: 'Get posts by category ID' })
  @ApiParam({
    name: 'categoryId',
    description: 'ID of the category to retrieve posts from',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved posts for the category.',
  })
  async getPostsByCategoryId(@Param('categoryId') categoryId: number) {
    return this.categoriesService.getPostsByCategory(categoryId)
  }

  @Post()
  @Roles('ADMIN')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'Category successfully created.' })
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto)
  }

  @Patch(':categoryId')
  @Roles('ADMIN')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @ApiOperation({ summary: 'Update an existing category' })
  @ApiParam({ name: 'categoryId', description: 'ID of the category to update' })
  @ApiResponse({ status: 200, description: 'Category successfully updated.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  async updateCategory(
    @Param('categoryId') categoryId: number,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoriesService.updateCategory(categoryId, updateCategoryDto)
  }

  @Delete(':categoryId')
  @Roles('ADMIN')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a category' })
  @ApiParam({ name: 'categoryId', description: 'ID of the category to delete' })
  @ApiResponse({ status: 200, description: 'Category successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  async deleteCategory(@Param('categoryId') categoryId: number) {
    return this.categoriesService.deleteCategory(categoryId)
  }
}
