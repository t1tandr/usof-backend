import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Comment } from "src/comments/comments.model";
import { Post } from "src/posts/posts.model";
import { User } from "src/users/users.model";

@Table({
	tableName: 'likes',
	indexes: [{ unique: true, fields: ['userId', 'postId', 'commentId'] }],
})
export class Like extends Model<Like> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER, allowNull: false })
	userId: number

	@ForeignKey(() => Post)
	@Column({ type: DataType.INTEGER, allowNull: true })
	postId: number

	@ForeignKey(() => Comment)
	@Column({ type: DataType.INTEGER, allowNull: true })
	commentId: number

	@BelongsTo(() => User)
	user: User
}