import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';

@Injectable()
export class CommentsService {

    constructor(@InjectModel(Comment) private commentRepository: typeof Comment) {}

    async create(dto: CreateCommentDto) {
        return await this.commentRepository.create(dto);
    }

    async findAll(postId: number) {
        return await this.commentRepository.findAll({
            where: { postId },
            include: { all: true }
        })
    }

    async delete(dto: DeleteCommentDto) {
        let comment = await this.commentRepository.findByPk(dto.commentId);
        if(!comment) {
            throw new NotFoundException('Comment is not found')
        }
        await comment.destroy();
        return { message: 'Comment was deleted successfully'}
    }
}
