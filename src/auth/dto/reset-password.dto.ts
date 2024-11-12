import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength } from 'class-validator'

export class ResetPasswordDto {
	@ApiProperty({
		example: 'some-reset-token',
		description: 'The token for resetting the password, usually sent via email',
	})
	@IsString()
	token: string

	@ApiProperty({
		example: 'newPassword123',
		description:
			'The new password for the user account, minimum length of 6 characters',
	})
	@IsString()
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	newPassword: string
}
