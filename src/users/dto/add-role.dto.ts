import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {
	@ApiProperty({ example: 'ADMIN', description: 'adding admin role' })
	@IsString({ message: 'It should be a string value' })
	readonly value: string

	@ApiProperty({ example: 1, description: 'user id' })
	@IsNumber({}, { message: 'It should be a NUM value' })
	readonly userId: number
}