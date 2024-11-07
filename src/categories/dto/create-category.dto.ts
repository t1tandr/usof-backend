import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCategoryDto {
	@ApiProperty({ example: 'Technology', description: 'Category title' })
	@IsString()
	readonly title: string
}