import { forwardRef, Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { Post } from 'src/posts/posts.model';
import { User } from 'src/users/users.model';
import Like from 'src/likes/likes.model';
import { LikesModule } from 'src/likes/likes.module';
import { CommentsController } from './comments.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [
		SequelizeModule.forFeature([Comment, Post, User, Like]),
		forwardRef(() => AuthModule),
		LikesModule,
	],
	providers: [CommentsService],
	exports: [CommentsService],
	controllers: [CommentsController],
})
export class CommentsModule {}
