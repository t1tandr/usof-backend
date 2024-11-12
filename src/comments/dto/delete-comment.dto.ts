import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class DeleteCommentDto {
	@ApiProperty({ example: 1, description: 'ID of the comment to be deleted' })
	@IsNumber({}, { message: 'Should be a NUM value' })
	readonly commentId: number

	@ApiProperty({
		example: 5,
		description: 'ID of the user who deletes the comment',
	})
	@IsNumber({}, { message: 'Should be a NUM value' })
	readonly userId: number
}
