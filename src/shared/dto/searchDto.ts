import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { Order } from "../enum/order.pagination";

export class SearchDto { 
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    readonly search?: string = '';  
}