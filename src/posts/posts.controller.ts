import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	Request,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { PostsService } from './posts.service'
import { FileInterceptor } from '@nestjs/platform-express'
import {
	ApiOperation,
	ApiResponse,
	ApiTags,
	ApiBearerAuth,
	ApiParam,
	ApiQuery,
} from '@nestjs/swagger'
import { Post as PostModel } from './posts.model'
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UpdatePostDto } from './dto/update-post.dto'

@ApiTags('Posts')
@Controller('api/posts')
export class PostsController {
	constructor(private postService: PostsService) {}

	@ApiOperation({ summary: 'Get all posts' })
	@ApiQuery({
		name: 'page',
		required: false,
		description: 'Page number for pagination',
	})
	@ApiQuery({
		name: 'limit',
		required: false,
		description: 'Number of posts per page',
	})
	@ApiResponse({ status: 200, description: 'List of posts', type: [PostModel] })
	@Get()
	async getAllPosts(
		@Query('page') page: number,
		@Query('limit') limit: number
	) {
		return this.postService.getAllPosts(page, limit)
	}

	@ApiOperation({ summary: 'Get post by ID' })
	@ApiParam({ name: 'id', description: 'ID of the post' })
	@ApiResponse({ status: 200, description: 'Post data', type: PostModel })
	@Get(':id')
	async getPostById(@Param('id') id: number) {
		return this.postService.getPostById(id)
	}

	@ApiOperation({ summary: 'Create a new post' })
	@ApiBearerAuth() // Requires JWT authentication
	@ApiResponse({ status: 200, description: 'Created post', type: PostModel })
	@Post()
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('image'))
	createPost(
		@Request() req,
		@Body() dto: CreatePostDto,
		@UploadedFile() image
	) {
		const userId = req.user.id
		return this.postService.create(dto, image, userId)
	}

	@ApiOperation({ summary: 'Update a post' })
	@ApiParam({ name: 'id', description: 'ID of the post' })
	@ApiBearerAuth()
	@ApiResponse({ status: 200, description: 'Updated post', type: PostModel })
	@Patch(':id')
	async updatePost(
		@Param('id') id: number,
		@Body() dto: UpdatePostDto,
		@Request() req
	) {
		const userId = req.user.id
		const roles = req.user['roles']
		const isAdmin = roles.some(role => role.value === 'ADMIN')
		return this.postService.updatePost(id, dto, userId, isAdmin)
	}

	@ApiOperation({ summary: 'Get comments for a post' })
	@ApiParam({ name: 'postId', description: 'ID of the post' })
	@ApiResponse({
		status: 200,
		description: 'List of comments',
		type: [CreateCommentDto],
	})
	@Get(':postId/comments')
	getAllComments(@Param('postId') postId: number) {
		return this.postService.getAllCommentsForPost(postId)
	}

	@ApiOperation({ summary: 'Add a comment to a post' })
	@ApiParam({ name: 'postId', description: 'ID of the post' })
	@ApiBearerAuth()
	@ApiResponse({
		status: 201,
		description: 'Created comment',
		type: CreateCommentDto,
	})
	@UseGuards(JwtAuthGuard)
	@Post(':postId/comments')
	createComment(
		@Request() req,
		@Param('postId') postId: number,
		@Body() dto: CreateCommentDto
	) {
		const userId = req.user.id
		return this.postService.createCommentForPost(postId, dto, userId)
	}

	@ApiOperation({ summary: 'Like a post' })
	@ApiParam({ name: 'postId', description: 'ID of the post' })
	@ApiBearerAuth()
	@ApiResponse({ status: 200, description: 'Post successfully liked' })
	@UseGuards(JwtAuthGuard)
	@Post(':postId/like')
	async likePost(@Param('postId') postId: number, @Request() req: any) {
		const userId = req.user.id
		return this.postService.likePost(postId, userId)
	}

	@ApiOperation({ summary: 'Unlike a post' })
	@ApiParam({ name: 'postId', description: 'ID of the post' })
	@ApiBearerAuth()
	@ApiResponse({ status: 200, description: 'Post successfully unliked' })
	@UseGuards(JwtAuthGuard)
	@Delete(':postId/like')
	async unlikePost(@Param('postId') postId: number, @Request() req: any) {
		const userId = req.user.id
		return this.postService.unlikePost(postId, userId)
	}

	@ApiOperation({ summary: 'Get the number of likes for a post' })
	@ApiParam({ name: 'postId', description: 'ID of the post' })
	@ApiResponse({ status: 200, description: 'Number of likes' })
	@Get(':postId/likes')
	async countLikes(@Param('postId') postId: number) {
		return this.postService.countPostLikes(postId)
	}

	@ApiOperation({ summary: 'Get users who liked the post' })
	@ApiParam({ name: 'postId', description: 'ID of the post' })
	@ApiResponse({ status: 200, description: 'List of users' })
	@Get(':postId/users')
	async getUsersWhoLikedPost(@Param('postId') postId: number) {
		return this.postService.getUsersWhoLikedPost(postId)
	}

	@ApiOperation({ summary: 'Delete a post' })
	@ApiParam({ name: 'id', description: 'ID of the post' })
	@ApiBearerAuth()
	@ApiResponse({ status: 200, description: 'Post successfully deleted' })
	@Delete(':id')
	async deletePost(@Param('id') id: number, @Request() req) {
		const userId = req.user.id
		const roles = req.user['roles']
		const isAdmin = roles.some(role => role.value === 'ADMIN')
		return this.postService.deletePost(id, userId, isAdmin)
	}
}
