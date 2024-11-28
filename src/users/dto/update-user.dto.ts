import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString, IsEmail, Length } from 'class-validator'

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'newUsername',
    description: 'Updated username',
  })
  @IsOptional()
  @IsString()
  @Length(3, 20, {
    message: 'Username must be between 3 and 20 characters long',
  })
  username?: string

  @ApiPropertyOptional({
    example: 'custom-avatar.png',
    description: 'Avatar file name',
  })
  @IsOptional()
  @IsString()
  avatar?: string
}
