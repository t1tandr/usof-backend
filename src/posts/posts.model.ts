import { ApiProperty } from '@nestjs/swagger'
import {
	BelongsTo,
	BelongsToMany,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript'
import { Category } from 'src/categories/categories.model'
import Like from 'src/likes/likes.model'
import { User } from 'src/users/users.model'

interface PostCreationAttrs {
	title: string
	content: string
	userId: number
	image: string
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
	@ApiProperty({ example: '1', description: 'Unique identifier for the post' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({ example: 'Weather', description: 'Title of the post' })
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	title: string

	@ApiProperty({
		example: 'Weather is bad today',
		description: 'Content or description of the post',
	})
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	content: string

	@ApiProperty({
		example: 'sun.jpg',
		description: 'Image associated with the post',
	})
	@Column({
		type: DataType.STRING,
	})
	image: string

	@ApiProperty({ example: '5', description: 'User ID who created the post' })
	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
	})
	userId: number

	@BelongsTo(() => User)
	author: User

	@HasMany(() => Like, { foreignKey: 'postId', constraints: false })
	likes: Like[]

	@ApiProperty({
		example: '3',
		description: 'Category ID to which the post belongs',
	})
	@ForeignKey(() => Category)
	@Column({ type: DataType.INTEGER, allowNull: false })
	categoryId: number

	@BelongsTo(() => Category)
	category: Category
}
