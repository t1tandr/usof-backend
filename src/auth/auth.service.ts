import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { MailService } from 'src/mail/mail.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private jwtService: JwtService,
        private mailService: MailService,
	) {}

	async login(userDto: LoginUserDto) {
		const user = await this.validateUser(userDto)
		return this.generateToken(user)
	}

	async registration(userDto: CreateUserDto) {
		const candidate = await this.userService.getUserByEmail(userDto.email)

		if (candidate) {
			throw new HttpException(
				'User with this e-mail already exist',
				HttpStatus.BAD_REQUEST
			)
		}

		const hashPassword = await bcrypt.hash(userDto.password, 5)
		const user = await this.userService.createUser({
			...userDto,
			password: hashPassword,
		})
		return this.generateToken(user)
	}

	private async generateToken(user: User) {
		const payload = {
			email: user.email,
			id: user.id,
			roles: user.roles,
		}
		return {
			token: this.jwtService.sign(payload),
		}
	}

	private async validateUser(userDto: LoginUserDto) {
		const user = await this.userService.getUserByEmail(userDto.email)
		const passwordEquals = await bcrypt.compare(userDto.password, user.password)

		if (user && passwordEquals) {
			return user
		}
		throw new UnauthorizedException({ message: 'Incorrect e-mail or password' })
	}

	async forgotPassword(dto: ForgotPasswordDto) {
		const user = await this.userService.getUserByEmail(dto.email);
        if(!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const payload = {
			email: user.email,
			id: user.id,
			roles: user.roles,
		}
        const token = this.jwtService.sign(payload);

        const resetUrl = `http://frontend-url/reset-password?token=${token}`;

        await this.mailService.sendPasswordResetEmail(dto.email, resetUrl);
        return { message: 'Password reset email sent' };        
	}

    async resetPassword(dto: ResetPasswordDto) {
        try{
            const payload = this.jwtService.verify(dto.token);
            const user = await this.userService.findById(payload.id);
            if(!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            await this.userService.updatePassword(user.id, dto.newPassword);
            return { message: 'Password reset successfully' }
        } catch(e) {
            throw new HttpException('Invalid on expired token', HttpStatus.BAD_REQUEST);
        }
    }
}
