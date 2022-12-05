import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDoctorDto {
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
    @IsString()
    readonly department : string;

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
