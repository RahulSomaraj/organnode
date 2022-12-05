import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionsDto } from 'src/shared/dto/paginationDto';
import { SearchDto } from 'src/shared/dto/searchDto';
import { SortFieldDto } from 'src/shared/dto/sortFiledsDto';
import { DoctorSortingFields } from 'src/shared/enum/sort.organization';
import { User } from 'src/user/entity/user.entity';
import { Connection, Repository } from 'typeorm';

import { CreateOrganDto } from './dto/CreateOrganDto';
import { Organ } from './entity/organ.entity';
import { UserType } from './enum/user.types';



@Injectable()
export class OrganService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(Organ)
    private organRepository: Repository<Organ>,
  ) {}


  async createOrgan(createOrganDto : CreateOrganDto, jwt: string) {
    const organRequest = await this.organRepository.findOne({
      where : {
        organ : createOrganDto.organ,
        contactNumber : createOrganDto.contactNumber,
        doctor : createOrganDto.doctor,
        bloodGroup : createOrganDto.bloodGroup
      }
    })
    if(organRequest) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: `Organ Request exists `,
      }, HttpStatus.CONFLICT);
    }
    const organ : Organ = this.organRepository.create(createOrganDto);
    organ.joinDate = new Date();
    await this.organRepository.save(organ);
    return {
      id: organ.id,
      name: organ.hospitalName,
      doctor: organ.doctor,
    };   

  }

  
  async getOrgan( paginationDto: PageOptionsDto, search: SearchDto, sortField : SortFieldDto ) {
    const query = this.connection
    .getRepository(Organ)
    .createQueryBuilder('organ')

    if (search.search?.length){
      query
      .where(`organ.${DoctorSortingFields.NAME} ILIKE :searchTerm`,{ searchTerm : `%${search.search}%` })
    }
  
    if( sortField.sortField ){
      query.orderBy(`organ.${sortField.sortField}`, paginationDto.order)
    } 
  
    let [ organs, count ] = await query
    .skip( (paginationDto.offset-1) * paginationDto.take )
    .take(paginationDto.take)    
    .getManyAndCount();    
    return {
      organs,
      count
    }    
  }
}
