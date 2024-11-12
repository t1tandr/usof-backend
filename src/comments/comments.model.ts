import { ApiProperty } from '@nestjs/swagger'
import {
	AllowNull,
	AutoIncrement,
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript'
import Like from 'src/likes/likes.model'
import { Post } from 'src/posts/posts.model'
import { User } from 'src/users/users.model'

interface CommentCreationAttrs {
	content: string
	postId: number
	userId: number
}

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, CommentCreationAttrs> {
	@ApiProperty({ example: 1, description: 'ID of the comment' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({
		example: 'Great post!',
		description: 'Content of the comment',
	})
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	content: string

	@ApiProperty({
		example: 1,
		description: 'ID of the post to which the comment belongs',
	})
	@ForeignKey(() => Post)
	@Column({ type: DataType.INTEGER })
	postId: number

	@BelongsTo(() => Post)
	post: Post

	@ApiProperty({
		example: 5,
		description: 'ID of the user who wrote the comment',
	})
	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	userId: number

	@BelongsTo(() => User)
	author: User

	@HasMany(() => Like, { foreignKey: 'commentId', constraints: false })
	likes: Like[]
}
