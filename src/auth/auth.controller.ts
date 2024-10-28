import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@ApiOperation({ summary: 'Login to system' })
	@ApiResponse({ status: 200, type: 'tokenJWT' })
	@Post('/login')
	login(@Body() userDto: CreateUserDto) {
		return this.authService.login(userDto)
	}

	@ApiOperation({ summary: 'Registration to system' })
	@ApiResponse({ status: 200, type: 'tokenJWT' })
	@Post('/registration')
	registration(@Body() userDto: CreateUserDto) {
		return this.authService.registration(userDto)
	}
}
