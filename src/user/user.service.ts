import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Brackets, Connection, Not, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/CreateUserDto';
import { PageOptionsDto } from 'src/shared/dto/paginationDto';
import { SearchDto } from 'src/shared/dto/searchDto';
import { SortFieldDto } from 'src/shared/dto/sortFiledsDto';
import { DoctorSortingFields } from 'src/shared/enum/sort.organization';
import { UserType } from './enum/user.types';



@Injectable()
export class UserService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}


  async createUser(createUserDto : CreateUserDto, jwt: string): Promise<{
    id : number,
    userName : string,
    name : string,
    email : string
  }> {

    const existingUser: User | undefined = await this.userRepository.findOne({
      where : [
        { userName : createUserDto.userName },
        { contactEmail :  createUserDto.contactEmail },
        { contactNumber : createUserDto.contactNumber },
      ]
    })
    if (existingUser) {
      if(existingUser.contactEmail === createUserDto.contactEmail) {
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: `User email exists `,
        }, HttpStatus.CONFLICT);
      } else if (existingUser.contactNumber === createUserDto.contactNumber) {
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: `User Phone number exists `,
        }, HttpStatus.CONFLICT);
      } else {
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: `User Already exists may be with same username `,
        }, HttpStatus.CONFLICT);
      }
    }
    const createUser = {
      ...createUserDto,
      userType : UserType.USER
    }
      const user: User = this.userRepository.create(createUser);
      user.joinDate = new Date();
      user.addDate = new Date();
      await this.userRepository.save(user);
      return {
        id: user.id,
        userName: user.userName,
        name: user.name,
        email: user.contactEmail,
      };
    
  }

  async getUsers( paginationDto: PageOptionsDto, search: SearchDto, sortField : SortFieldDto ) {
    const query = this.connection
    .getRepository(User)
    .createQueryBuilder('doctor')
    // .leftJoinAndSelect('doctor.departments','departments')
    .where('"doctor"."userType" = :userType', { userType : UserType.USER })

    if (search.search?.length){
      query
      .andWhere(`doctor.${DoctorSortingFields.NAME} ILIKE :searchTerm`,{ searchTerm : `%${search.search}%` })
    }
  
  if( sortField.sortField ){
    query.orderBy(`doctor.${sortField.sortField}`, paginationDto.order)
  } 
  
    let [ doctor, count ] = await query
    .skip((paginationDto.offset-1)*paginationDto.take)
    .take(paginationDto.take)    
    .getManyAndCount();    
    return {
      doctor,
      count
    }    
  }

}