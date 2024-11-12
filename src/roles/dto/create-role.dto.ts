import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class createRoleDto {
  @ApiProperty({ example: 'News', description: 'Category name' })
  @IsString({ message: 'It should be a string value' })
  readonly value: string

  @ApiProperty({
    example: 'World`s news',
    description: 'Description of category',
  })
  @IsString({ message: 'It should be a string value' })
  readonly description: string
}
