import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'

export class LoginUserDto {
	@ApiProperty({ example: 'example@gmail.com', description: 'User email' })
	@IsString({ message: 'Should be a string value' })
	@IsEmail({}, { message: 'Incorrect e-mail' })
	readonly email: string

	@ApiProperty({ example: '12345678', description: 'User password' })
	@IsString({ message: 'Should be a string value' })
	@Length(8, 16, { message: 'Should be longer than 8 and shorter than 16' })
	readonly password: string
}
