import { Body, Controller, Get, Headers, Post, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth-guard';
import { Roles } from 'src/auth/guard/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guards';
import { PageOptionsDto } from 'src/shared/dto/paginationDto';
import { SearchDto } from 'src/shared/dto/searchDto';
import { SortFieldDto } from 'src/shared/dto/sortFiledsDto';
import { HttpExceptionFilter } from 'src/shared/exception-service';

import { CreateUserDto } from './dto/CreateUserDto';
import { UserType } from './enum/user.types';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('users')
@UseFilters(new HttpExceptionFilter('User'))
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard,RolesGuard)
// @Roles(UserType.DOCTOR,UserType.ADMIN,UserType.USER)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}
  
  @Post('/create')
  createUser(
    @Headers('Authorization') auth: string,
    @Body() createUserDto: CreateUserDto,
  ) : Promise<{
    id : number,
    userName : string,
    name : string,
    email : string
  }> {
    return this.userService.createUser(createUserDto,auth);
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
    return this.userService.getUsers( doctorDto, search, SortFieldDto );
  }

}