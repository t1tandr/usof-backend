import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class BanUserDto {
	@ApiProperty({ example: 1, description: 'user id' })
	@IsNumber({}, { message: 'It should be a NUM value' })
	readonly userId: number

	@ApiProperty({ example: 'toxic', description: 'ban reason' })
	@IsString({ message: 'It should be a string value' })
	readonly banReason: string
}