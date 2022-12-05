import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsDate, IsString, IsDateString } from 'class-validator';
import { UserType } from "../enum/user.types";

export class CreateOrganDto {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly name : string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly hospitalName : string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly doctor: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly bloodGroup: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly organ: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsPhoneNumber('IN')
    readonly contactNumber: string;
}
