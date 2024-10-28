import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Like } from './likes.model'
import { User } from 'src/users/users.model'

@Injectable()
export class LikesService {
	constructor(@InjectModel(Like) private likeRepository: typeof Like) {}

	async addLike(
		userId: number,
		likeableId: number,
		likeableType: 'post' | 'comment'
	) {
		const likeField =
			likeableType === 'post'
				? { postId: likeableId }
				: { commentId: likeableId }

		const like = await this.likeRepository.findOne({
			where: { userId, ...likeField },
		})

		if (like) {
			throw new HttpException('Like already exists', HttpStatus.CONFLICT)
		}

		return await this.likeRepository.create({
			userId,
			...likeField,
		})
	}

	async removeLike(
		userId: number,
		likeableId: number,
		likeableType: 'post' | 'comment'
	) {
		const likeField =
			likeableType === 'post'
				? { postId: likeableId }
				: { commentId: likeableId }

		const like = await this.likeRepository.findOne({
			where: { userId, ...likeField },
		})

		if (!like) {
			throw new HttpException('Like not found', HttpStatus.NOT_FOUND)
		}

		await like.destroy()
		return { message: 'Like deleted' }
	}

	async countLikes(likeableId: number, likeableType: 'post' | 'comment') {
		const likeField =
			likeableType === 'post'
				? { postId: likeableId }
				: { commentId: likeableId }

		return await this.likeRepository.count({
			where: likeField,
		})
	}

	async getUsersWhoLiked(likeableId: number, likeableType: 'post' | 'comment') {
		const likeField =
			likeableType === 'post'
				? { postId: likeableId }
				: { commentId: likeableId }

		const likes = await this.likeRepository.findAll({
			where: likeField,
			include: [{ model: User, attributes: ['id', 'username'] }],
		})

		return likes.map(like => like.user)
	}
}
