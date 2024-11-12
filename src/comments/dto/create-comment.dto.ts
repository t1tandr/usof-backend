import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber } from 'class-validator'

export class CreateCommentDto {
  @ApiProperty({
    example: 'Great post!',
    description: 'Content of the comment',
  })
  @IsString()
  content: string

  @ApiProperty({
    example: '1',
    description: 'ID of the post that the comment is associated with',
  })
  @IsNumber()
  postId: number

  @ApiProperty({
    example: '5',
    description: 'ID of the user who made the comment',
  })
  @IsNumber()
  userId: number
}
