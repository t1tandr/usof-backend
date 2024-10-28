import { IsNumber, IsString } from "class-validator";

export class BanUserDto {
    @IsNumber({}, { message: 'It should be a NUM value' })
    readonly userId: number;
    
    @IsString({ message: 'It should be a string value' })
    readonly banReason: string;
}