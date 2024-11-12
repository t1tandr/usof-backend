import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class UpdateCategoryDto {
  @ApiProperty({
    example: 'Science',
    description: 'Category title',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly title?: string
}
