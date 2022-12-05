import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
const axios = require("axios");

require('dotenv').config({ path: process.env.NODE_ENV == 'dev' ? `.${process.env.NODE_ENV}.env` : '.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('tiny'));

  app.enableCors();// add whitelist domain as string array & set credentials-true as the part of security.
  const configService = app.get<ConfigService>(ConfigService);  
  const PORT = configService.get('APP_CONFIG.PORT');
  const config = new DocumentBuilder()
  .setTitle('NewShop API')
  .setDescription('NewShop API')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  app.useGlobalPipes(new ValidationPipe({
    // forbidUnknownValues : false,
    // forbidNonWhitelisted: true,
    // whitelist: true,
  }));

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);
  await app.listen(PORT,()=>{
    Logger.log(`Server Started at ${PORT}`);
  });
}
bootstrap();
