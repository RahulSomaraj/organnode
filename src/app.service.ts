import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from './entities/dto/userLoginDto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService : JwtService
  ) {}

  getHello(): string {
    return 'Hello World!';
  }


  async login(userLoginDto : LoginUserDto) : Promise<{
    id: number, 
    accessToken: string,
    userName : string,
    email : string,
    userType : string
  }> {
    let token = '';
    const user: User | undefined = await this.userRepository.findOne({
      where : [
        { userName : userLoginDto.username },
        { contactEmail :  userLoginDto.username },
        { contactNumber : userLoginDto.username }
      ]
    })
    if (!user) { 
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'User not found ',
      }, 401);
    } else if ( user && (await bcrypt.compare(userLoginDto.password, user.password))) {
      token = this.jwtService.sign(
        { id: user.id, email : user.contactEmail },
        { secret : process.env.TOKEN_KEY }
      );
      return {
        id: user.id,
        accessToken : token,
        userName : user.userName,
        email : user.contactEmail,
        userType : user.userType
      };
    } else {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Incorrect password for the user',
      }, 401);
    }
  }
}
