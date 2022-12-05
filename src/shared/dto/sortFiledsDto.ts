import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

import { DoctorSortingFields } from '../enum/sort.organization';

export class SortFieldDto {
    @ApiPropertyOptional({ enum: DoctorSortingFields, default: DoctorSortingFields.NAME })
    @IsEnum(DoctorSortingFields)
    @IsOptional()
    readonly sortField?: DoctorSortingFields = DoctorSortingFields.NAME;
}