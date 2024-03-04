import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS with specific origin
  app.enableCors({
    origin: 'http://localhost:4000',
  });
  await app.listen(3000);
}
bootstrap();
