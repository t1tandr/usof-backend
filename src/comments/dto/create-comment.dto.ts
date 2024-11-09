
import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber } from 'class-validator'

export class CreateCommentDto {
	@ApiProperty({
		example: 'Great post!',
		description: 'Content of the comment',
	})
	@IsString()
	content: string

	postId: number
	userId: number
}
