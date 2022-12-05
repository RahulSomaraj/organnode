import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsDateString, IsInt, Min, Max } from 'class-validator';
import { Type } from "class-transformer";


export class CreateUserDto {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    readonly name : string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly userName : string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    readonly age : number;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly address : string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly bloodGroup : string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    readonly password: string;

    @ApiPropertyOptional({
        example: 'johndoe@gmail.com',
        description: 'email',
    })
    @IsEmail()
    @IsNotEmpty()
    readonly contactEmail: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    readonly contactNumber: string;
}
