import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePostDto {
    @ApiProperty({ example: 'Weather', description: 'title for post' })
    @IsString({ message: 'Should be a string value' })
    readonly title: string;

    @ApiProperty({ example: 'Weather is bad today', description: 'Content for post' })
    @IsString({ message: 'Should be a string value' })
    readonly content: string;

    @ApiProperty({ example: '5', description: 'User ID, who wants to create post' })
    @IsString({ message: 'Should be a string value' })
    readonly userId: number; 
}