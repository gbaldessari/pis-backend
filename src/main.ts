import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
  await app.listen(process.env.PORT_APP || 3000);
  
}
bootstrap();
