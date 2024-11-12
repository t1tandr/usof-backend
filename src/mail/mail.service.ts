import { MailerService } from '@nestjs-modules/mailer'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

@Injectable()
export class MailService {
	constructor(private readonly mailerService: MailerService) {}

	async sendPasswordResetEmail(email: string, resetUrl: string) {
		try {
			await this.mailerService.sendMail({
				to: email,
				subject: 'Password reset request',
				template: 'password-reset',
				context: { resetUrl },
			})
		} catch (error) {
			console.log('Error sending an email');
			throw new HttpException('Error sending reset password', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}
