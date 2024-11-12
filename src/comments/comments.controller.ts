import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common'
import { CommentsService } from './comments.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ApiResponse } from '@nestjs/swagger'

@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':comment_id')
  @ApiResponse({ status: 200, description: 'Retrieve a comment by ID' })
  getCommentById(@Param('comment_id') commentId: number) {
    return this.commentsService.getCommentById(commentId)
  }

  @Get(':comment_id/like')
  @ApiResponse({ status: 200, description: 'Retrieve all likes for a comment' })
  getAllLikes(@Param('comment_id') commentId: number) {
    return this.commentsService.getAllLikes(commentId)
  }

  @UseGuards(JwtAuthGuard)
  @Post(':comment_id/like')
  @ApiResponse({ status: 201, description: 'Like a comment' })
  likeComment(@Param('comment_id') commentId: number, @Request() req) {
    const userId = req.user['id']
    return this.commentsService.likeComment(commentId, userId)
  }

  @Patch(':comment_id')
  @ApiResponse({ status: 200, description: 'Update a comment' })
  updateComment(
    @Param('comment_id') commentId: number,
    @Body() content: string,
    @Request() req
  ) {
    const userId = req.user['id']
    return this.commentsService.updateComment(commentId, content, userId)
  }

  @Delete(':comment_id')
  @ApiResponse({ status: 200, description: 'Delete a comment' })
  deleteComment(@Param('comment_id') commentId: number, @Request() req) {
    const userId = req.user['id']
    const roles = req.user['roles']
    const isAdmin = roles.some((role) => role.value === 'ADMIN')
    return this.commentsService.deleteComment(commentId, userId, isAdmin)
  }

  @Delete(':comment_id/like')
  @ApiResponse({ status: 200, description: 'Unlike a comment' })
  unlikeComment(@Param('comment_id') commentId: number, @Request() req) {
    const userId = req.user['id']
    return this.commentsService.unlikeComment(commentId, userId)
  }
}
