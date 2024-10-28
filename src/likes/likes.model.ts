import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/posts.model";
import { User } from "src/users/users.model";

@Table({ tableName: 'likes' })
export class Like extends Model<Like> {
    
    @ForeignKey(() => Post)
    @Column({ type: DataType.INTEGER})
    postId: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;
}