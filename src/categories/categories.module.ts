import { forwardRef, Module } from '@nestjs/common'
import { CategoriesController } from './categories.controller'
import { CategoriesService } from './categories.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { Category } from './categories.model'
import { Post } from 'src/posts/posts.model'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [
    SequelizeModule.forFeature([Category, Post]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
