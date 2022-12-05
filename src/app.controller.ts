import { Body, Controller, Get, Post, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guard/local-auth-guard';
import { LoginUserDto } from './entities/dto/userLoginDto';
import { HttpExceptionFilter } from './shared/exception-service';

@Controller()
@UseFilters(new HttpExceptionFilter('Login'))
export class AppController {
  constructor(private readonly appService: AppService) {}
  

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(
    @Body() userLoginDto : LoginUserDto,
  ): Promise<{
    id: number, 
    accessToken: string,
    userName : string,
    email : string,
    userType : string
  }> {
    return this.appService.login(userLoginDto);
  }
}
