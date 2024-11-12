import { ApiProperty } from '@nestjs/swagger'
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { Post } from 'src/posts/posts.model'

interface CategoryCreationAttrs {
	title: string
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreationAttrs> {
	@ApiProperty({
		example: 1,
		description: 'Unique identifier for the category',
	})
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({ example: 'Technology', description: 'Title of the category' })
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	title: string

	@HasMany(() => Post)
	posts: Post[]
}
