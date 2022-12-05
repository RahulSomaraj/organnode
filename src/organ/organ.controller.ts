import { Body, Controller, Get, Headers, Post, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth-guard';
import { Roles } from 'src/auth/guard/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guards';
import { PageOptionsDto } from 'src/shared/dto/paginationDto';
import { SearchDto } from 'src/shared/dto/searchDto';
import { SortFieldDto } from 'src/shared/dto/sortFiledsDto';
import { HttpExceptionFilter } from 'src/shared/exception-service';
import { OrganService } from './organ.service';

import { CreateOrganDto } from './dto/CreateOrganDto';
import { UserType } from './enum/user.types';

@Controller('organ')
@ApiTags('organ')
@UseFilters(new HttpExceptionFilter('Organ'))
@ApiBearerAuth()
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(UserType.DOCTOR,UserType.ADMIN,UserType.USER)
export class OrganController {
  constructor(
    private readonly organService: OrganService,
  ) {}
  
  @Post('/create')
  createUser(
    @Headers('Authorization') auth: string,
    @Body() createOrganDto: CreateOrganDto,
  ) {
    return this.organService.createOrgan(createOrganDto,auth);
  }

  @Get('/getAll')
  getDoctor(
    @Headers('Authorization') auth: string,
    @Query() doctorDto : PageOptionsDto ,
    @Query() search : SearchDto ,
    @Query() SortFieldDto : SortFieldDto ,
    @Req() request
  ) {
    const { user } = request;
    return this.organService.getOrgan( doctorDto, search, SortFieldDto );
  }

}
