import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const allowedOrigin = configService.get<string>('REACT_APP_URL');

  app.enableCors({
    origin: allowedOrigin,
  });

  const options = new DocumentBuilder()
    .setTitle('ShiftLabs API Documentation')
    .setDescription('Endpoints available to use for final client services')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: false,
  });
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
