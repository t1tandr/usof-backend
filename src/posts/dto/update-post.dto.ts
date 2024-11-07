import { IsString, IsOptional, IsNumber } from 'class-validator'

export class UpdatePostDto {
	@IsString()
	@IsOptional()
	title?: string

	@IsString()
	@IsOptional()
	content?: string

	@IsNumber({}, { message: 'Should be a NUM value' })
	@IsOptional()
	readonly categoryId: number
}
