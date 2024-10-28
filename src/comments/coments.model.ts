import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/posts.model";
import { User } from "src/users/users.model";


@Table({ tableName: 'comments' })
export class Comment extends Model<Comment> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    content: string;

    @ForeignKey(() => Post)
    @Column({ type: DataType.INTEGER})
    postId: number;

    @BelongsTo(() => Post)
    post: Post;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    author: User;
}