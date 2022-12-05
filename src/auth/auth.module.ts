import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import appConfig from "src/config/app.config";
import devConfig from "src/config/dev.config";
import stagConfig from "src/config/stag.config";
import { User } from "src/user/entity/user.entity";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./passport-strategies/jwt-strategy";
import { LocalStrategy } from "./passport-strategies/local-strategy";



@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({
      load: [appConfig, devConfig, stagConfig],
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([
       User
    ]),
    JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          // secret: configService.get<string>('jwt.secret'),
          secret: process.env.TOKEN_KEY,
        }),
        inject: [ConfigService],
      }),
  ],
  providers: [
      AuthService, 
      LocalStrategy, 
      JwtStrategy
  ],
  exports: [AuthService],
})
export class AuthModule {}
