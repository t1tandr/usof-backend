import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Post as PostModel } from './posts.model';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdatePostDto } from './dto/update-post.dto';
import { isatty } from 'tty';

@ApiTags('Posts')
@Controller('api/posts')
export class PostsController {
	constructor(private postService: PostsService) {}

	@Get()
	async getAllPosts(@Query('page') page: number, @Query('limit') limit: number) {
		return this.postService.getAllPosts(page, limit)
	}

	@Get(':id')
	async getPostById(@Param('id') id: number) {
		return this.postService.getPostById(id);
	}

	@ApiOperation({ summary: 'Creating a post'})
	@ApiResponse({ status: 200, type: PostModel })
	@Post()
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('image'))
	createPost(@Request() req, @Body() dto: CreatePostDto, @UploadedFile() image) {
		const userId = req.user.id;
		return this.postService.create(dto, image, userId)
	}

	@Patch(':id')
	async updatePost(
		@Param('id') id: number,
		@Body() dto: UpdatePostDto,
		@Request() req
	) {
		const userId = req.user.id;
		const roles = req.user['roles'];
		const isAdmin = roles.some(role => role.value === 'ADMIN');
		return this.postService.updatePost(id, dto, userId, isAdmin);
	}

	@Get(':postId/comments')
	getAllComments(@Param('postId') postId: number) {
		return this.postService.getAllCommentsForPost(postId);
	}

	@UseGuards(JwtAuthGuard)
	@Post(':postId/comments')
	createComment(@Request() req, @Param('postId') postId: number, @Body() dto: CreateCommentDto){
		const userId = req.user.id;
		return this.postService.createCommentForPost(postId, dto, userId);
	}

	@Delete(':id')
	async deletePost(@Param('id') id: number, @Request() req) {
		const userId = req.user.id;
		const roles = req.user['roles']
		const isAdmin = roles.some(role => role.value === 'ADMIN')
		return this.postService.deletePost(id, userId, isAdmin)
	}
}
