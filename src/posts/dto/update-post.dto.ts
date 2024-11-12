import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsNumber } from 'class-validator'

export class UpdatePostDto {
	@ApiProperty({ example: 'Bad weather', description: 'Post`s title' })
	@IsString()
	@IsOptional()
	title?: string

	@ApiProperty({
		example: 'Today it will be a bad weather',
		description: 'Post`s content',
	})
	@IsString()
	@IsOptional()
	content?: string

	@ApiProperty({ example: 1, description: 'Category Id' })
	@IsNumber({}, { message: 'Should be a NUM value' })
	@IsOptional()
	readonly categoryId: number
}
