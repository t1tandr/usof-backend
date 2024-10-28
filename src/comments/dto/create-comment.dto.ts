import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, isNumber, IsString } from 'class-validator'

export class CreateCommentDto {
	@ApiProperty({
		example: 'It`s so funny',
		description: 'Main content of comment',
	})
	@IsString({ message: 'Should be a string value' })
	readonly content: string

	@ApiProperty({
		example: '4',
		description: 'Post`s ID',
	})
	@IsNumber({}, { message: 'Should be a NUM value' })
	readonly postId: number;

	@ApiProperty({
		example: '5',
		description: 'User`s ID',
	})
	@IsNumber({}, { message: 'Should be a NUM value' })
	readonly userId: number
}
