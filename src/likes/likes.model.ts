import { ApiProperty } from '@nestjs/swagger'
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'
import { Comment } from 'src/comments/comments.model'
import { Post } from 'src/posts/posts.model'
import { User } from 'src/users/users.model'

@Table({ tableName: 'likes' })
export default class Like extends Model<Like> {
  @ApiProperty({ example: '1', description: 'Unique identifier for the like' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @ApiProperty({
    example: '5',
    description: 'User ID who liked the post or comment',
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number

  @ApiProperty({
    example: '3',
    description: 'Post ID that is liked by the user',
  })
  @ForeignKey(() => Post)
  @Column({ type: DataType.INTEGER, allowNull: true })
  postId: number

  @ApiProperty({
    example: '2',
    description: 'Comment ID that is liked by the user',
  })
  @ForeignKey(() => Comment)
  @Column({ type: DataType.INTEGER, allowNull: true })
  commentId: number

  @BelongsTo(() => User)
  user: User
}
