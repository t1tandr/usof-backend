import { forwardRef, Module } from '@nestjs/common'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Post } from './posts.model'
import { Comment } from 'src/comments/comments.model'
import { User } from 'src/users/users.model'
import { FilesModule } from 'src/files/files.module'
import { LikesModule } from 'src/likes/likes.module'
import { CommentsModule } from 'src/comments/comments.module'
import { CategoriesModule } from 'src/categories/categories.module'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    SequelizeModule.forFeature([User, Post, Comment]),
    FilesModule,
    LikesModule,
    CommentsModule,
    CategoriesModule,
    forwardRef(() => AuthModule),
  ],
})
export class PostsModule {}
