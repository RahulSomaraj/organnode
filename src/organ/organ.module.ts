import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganController } from './organ.controller';
import { OrganService } from './organ.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/user/entity/user.entity';
import { Organ } from './entity/organ.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Organ
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: process.env.TOKEN_KEY,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [OrganController],
  providers: [
    OrganService,    
  ],
})
export class OrganModule {}
