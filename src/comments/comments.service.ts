import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Comment } from './comments.model'
import Like from 'src/likes/likes.model'
import { CreateCommentDto } from './dto/create-comment.dto'

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
    @InjectModel(Like) private likeRepository: typeof Like
  ) {}

  async getAllCommentsForPost(postId: number) {
    const comments = await this.commentRepository.findAll({ where: { postId } })
    return comments || []
  }

  async getCommentById(commentId: number) {
    const comment = this.commentRepository.findByPk(commentId)
    if (!comment) {
      throw new NotFoundException('Comment is not found')
    }
    return comment
  }

  async getAllLikes(commentId: number) {
    return this.likeRepository.findAll({ where: { commentId } })
  }

  async createComment(
    createCommentDto: CreateCommentDto,
    postId: number,
    userId: number
  ) {
    const commentData = {
      ...createCommentDto,
      postId,
      userId,
    }
    return this.commentRepository.create(commentData)
  }

  async likeComment(commentId: number, userId: number) {
    return this.likeRepository.create({ commentId, userId })
  }

  async updateComment(commentId: number, content: string, userId: number) {
    const comment = await this.getCommentById(commentId)
    if (comment.userId !== userId)
      throw new ForbiddenException('You can only update your own comments')
    return comment.update({ content })
  }

  async deleteComment(commentId: number, userId: number, isAdmin: boolean) {
    const comment = await this.getCommentById(commentId)
    if (comment.userId !== userId && !isAdmin) {
      throw new ForbiddenException(
        'You can only delete your own comments or be an admin'
      )
    }
    await comment.destroy()
    return { message: 'Comment deleted successfully' }
  }

  async unlikeComment(commentId: number, userId: number) {
    const like = await this.likeRepository.findOne({
      where: { commentId, userId },
    })
    if (!like) {
      throw new NotFoundException('Like was not found')
    }
    await like.destroy()
    return { message: 'Like was destroyed successfully' }
  }
}
