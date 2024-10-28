import { ApiProperty } from '@nestjs/swagger';
import {
    BelongsTo,
	BelongsToMany,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import { User } from 'src/users/users.model'

interface PostCreationAttrs {
	title: string;
	content: string;
    userId: number;
    image: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
	@ApiProperty({ example: '1', description: 'Post id'})
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({ example: 'Weather', description: 'Title for post'})
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	title: string

	@ApiProperty({ example: 'Weather is bad today', description: 'Description for post'})
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	content: string

	@ApiProperty({ example: 'sun.jpg', description: 'Image for post'})
    @Column({	
        type: DataType.STRING,
    })
    image: string;

	@ApiProperty({ example: '5', description: 'UserId who did the post'})
    @ForeignKey(() => User)
    @Column({ 
        type: DataType.INTEGER
    })
    userId: number;

    @BelongsTo(() => User)
    author: User
}
