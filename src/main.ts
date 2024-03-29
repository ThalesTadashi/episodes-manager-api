import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.use(cors({ origin: 'http://localhost:4200' }));
  await app.listen(3000);
    //CORS 
    const whitelist = [
      'http://localhost:4200',
      'http://localhost:3000',
    ];
  
    app.enableCors({
      origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    });
}
bootstrap();
