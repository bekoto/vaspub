import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import bodyParser = require("body-parser");
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true , always : true}));
  app.use(bodyParser.json());
  
  await app.listen(4010, '0.0.0.0').then( e =>{
    
  } );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

}
bootstrap();
