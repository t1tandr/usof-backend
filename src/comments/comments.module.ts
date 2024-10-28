import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './coments.model';
import { Post } from 'src/posts/posts.model';
import { User } from 'src/users/users.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Comment, Post, User
    ])
  ],
  providers: [CommentsService]
})
export class CommentsModule {}
