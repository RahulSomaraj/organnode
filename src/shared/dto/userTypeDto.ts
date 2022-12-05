import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator";
import { UserType } from "src/user/enum/user.types";

export class UserTypeDto { 
    @ApiPropertyOptional({
        enum : UserType,
        default : UserType.DOCTOR
    })
    @IsEnum(UserType)
    @IsNotEmpty()
    @IsOptional()
    readonly user?: UserType = UserType.DOCTOR  
}