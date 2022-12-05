import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import appConfig from './config/app.config';
import devConfig from './config/dev.config';
import { configService } from './config/psql.config';
import stagConfig from './config/stag.config';
import { DoctorModule } from './doctor/doctor.module';
import { OrganModule } from './organ/organ.module';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';



@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      load: [appConfig, devConfig, stagConfig],
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(
      configService.getTypeOrmConfig(),
    ),
    TypeOrmModule.forFeature([
      User,
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: process.env.TOKEN_KEY,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    DoctorModule,
    OrganModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
