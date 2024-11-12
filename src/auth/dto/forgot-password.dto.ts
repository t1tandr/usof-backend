import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'

export class ForgotPasswordDto {
	@ApiProperty({
		example: 'user@example.com',
		description: 'Email address of the user requesting a password reset',
	})
	@IsEmail({}, { message: 'Invalid email address format' })
	email: string
}
