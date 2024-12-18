import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { InjectModel } from '@nestjs/sequelize'
import { Post } from './posts.model'
import { FilesService } from 'src/files/files.service'
import { CommentsService } from 'src/comments/comments.service'
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { LikesService } from 'src/likes/likes.service'

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private fileService: FilesService,
    private commentsService: CommentsService,
    private likesService: LikesService
  ) {}

  async getAllPosts(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit

    const { rows: posts, count: totalPosts } =
      await this.postRepository.findAndCountAll({
        offset: offset,
        limit: limit,
        order: [['createdAt', 'DESC']],
      })

    const totalPages = Math.ceil(totalPosts / limit)

    return {
      data: posts,
      currentPage: page,
      totalPages: totalPages,
      totalPosts: posts,
    }
  }

  async getPostById(postId: number) {
    const post = await this.postRepository.findByPk(postId)
    if (!post) {
      throw new NotFoundException('Post not found')
    }
    return post
  }

  async create(dto: CreatePostDto, image: any, userId: number) {
    const filename = await this.fileService.createFile(image)
    const post = await this.postRepository.create({
      ...dto,
      image: filename,
      userId,
    })
    return post
  }

  async updatePost(
    postId: number,
    dto: UpdatePostDto,
    userId: number,
    isAdmin: boolean
  ) {
    const post = await this.getPostById(postId)
    if (post.userId !== userId && !isAdmin) {
      throw new ForbiddenException('You can update only your own posts')
    }
    return post.update(dto)
  }

  async getAllCommentsForPost(postId: number) {
    await this.getPostById(postId)
    return this.commentsService.getAllCommentsForPost(postId)
  }

  async createCommentForPost(
    postId: number,
    dto: CreateCommentDto,
    userId: number
  ) {
    const post = this.postRepository.findByPk(postId)
    if (!post) {
      throw new NotFoundException('Post not found')
    }
    return this.commentsService.createComment(dto, postId, userId)
  }

  async likePost(postId: number, userId: number) {
    await this.getPostById(postId)
    return this.likesService.addLike(userId, postId, 'post')
  }

  async unlikePost(postId: number, userId: number) {
    await this.getPostById(postId)
    return this.likesService.removeLike(userId, postId, 'post')
  }

  async countPostLikes(postId: number) {
    await this.getPostById(postId)
    return this.likesService.countLikes(postId, 'post')
  }

  async getUsersWhoLikedPost(postId: number) {
    await this.getPostById(postId)
    return this.likesService.getUsersWhoLiked(postId, 'post')
  }

  async deletePost(postId: number, userId: number, isAdmin: boolean) {
    const post = await this.getPostById(postId)
    if (post.userId !== userId && !isAdmin) {
      throw new ForbiddenException('You can only delete your own posts')
    }
    await post.destroy()
    return { message: 'post deleted successfully' }
  }
}
