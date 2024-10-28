import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Like } from './likes.model';
import { Post } from 'src/posts/posts.model';
import { User } from 'src/users/users.model';
import { Comment } from 'src/comments/comments.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Like, Post, User, Comment
    ])
  ],
  providers: [LikesService],
  exports: [LikesService]
})
export class LikesModule {}
