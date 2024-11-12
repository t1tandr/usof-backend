import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreatePostDto {
  @ApiProperty({ example: 'Weather', description: 'title for post' })
  @IsString({ message: 'Should be a string value' })
  readonly title: string

  @ApiProperty({
    example: 'Weather is bad today',
    description: 'Content for post',
  })
  @IsString({ message: 'Should be a string value' })
  @IsNotEmpty()
  readonly content: string

  @ApiProperty({
    example: '5',
    description: 'User ID, who wants to create post',
  })
  // @IsNumber({}, { message: 'Should be a NUM value' })
  @IsNotEmpty()
  private readonly categoryId: number
}
