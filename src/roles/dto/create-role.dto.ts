import { IsString } from "class-validator";

export class createRoleDto {
	@IsString({ message: 'It should be a string value' })
	readonly value: string
    
	@IsString({ message: 'It should be a string value' })
	readonly description: string
}