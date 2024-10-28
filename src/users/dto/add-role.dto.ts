import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {
    @IsString({ message: 'It should be a string value' })
    readonly value: string;
    
    @IsNumber({}, { message: 'It should be a NUM value' })
    readonly userId: number;
}