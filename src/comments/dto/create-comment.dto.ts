
import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber } from 'class-validator'

export class CreateCommentDto {
	@ApiProperty({
		example: 'Great post!',
		description: 'Content of the comment',
	})
	@IsString()
	content: string

	@ApiProperty({ example: 1, description: 'ID of the post' })
	@IsNumber()
	postId: number

	@ApiProperty({ example: 2, description: 'ID of the user' })
	@IsNumber()
	userId: number
}
