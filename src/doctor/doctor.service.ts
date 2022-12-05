import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Brackets, Connection, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDoctorDto } from './dto/CreateDoctorDto';
import { User } from 'src/user/entity/user.entity';
import { PageOptionsDto } from 'src/shared/dto/paginationDto';
import { SearchDto } from 'src/shared/dto/searchDto';
import { DoctorSortingFields } from 'src/shared/enum/sort.organization';
import { UserType } from './enum/user.types';
import { SortFieldDto } from 'src/shared/dto/sortFiledsDto';



@Injectable()
export class DoctorService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}


  async createUser(createUserDto : CreateDoctorDto, jwt: string): Promise<{
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
      userType : UserType.DOCTOR
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

  
  async getDoctor( paginationDto: PageOptionsDto, search: SearchDto, sortField : SortFieldDto ) {
    const query = this.connection
    .getRepository(User)
    .createQueryBuilder('doctor')
    .where('"doctor"."userType" = :userType', { userType : UserType.DOCTOR })

    if (search.search?.length){
      query
      .andWhere(`doctor.${DoctorSortingFields.NAME} ILIKE :searchTerm`,{ searchTerm : `%${search.search}%` })
    }
  
    if( sortField.sortField ){
      query.orderBy(`doctor.${sortField.sortField}`, paginationDto.order)
    } 
  
    let [ doctor, count ] = await query
    .skip( (paginationDto.offset-1) * paginationDto.take )
    .take(paginationDto.take)    
    .getManyAndCount();    
    return {
      doctor,
      count
    }    
  }
}
