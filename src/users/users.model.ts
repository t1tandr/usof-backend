import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/posts.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs{
    email: string,
    password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
	@ApiProperty({ example: '1', description: 'user id' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({ example: 'example@gmail.com', description: 'user email' })
	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
	})
	email: string

	@ApiProperty({ example: '12345678', description: 'user password' })
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	password: string

	@ApiProperty({ example: 'false', description: 'user status' })
	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false,
	})
	banned: boolean

	@ApiProperty({ example: 'null', description: 'user ban reason' })
	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	banReason: string

	@BelongsToMany(() => Role, () => UserRoles)
	roles: Role[]

	@HasMany(() => Post)
	posts: Post[];
}