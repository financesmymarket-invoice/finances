import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { config } from 'dotenv';
import { BigIntInterceptor } from './common/filters/bigint.interceptor';

import * as bodyParser from 'body-parser';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new BigIntInterceptor());


  // ✅ Збільшуємо ліміт для JSON
  app.use(bodyParser.json({ limit: '50mb' }));

  // ✅ Збільшуємо ліміт для URL-encoded
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // Дозволити запити з GitHub Pages і з тунелю ngrok
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
    exposedHeaders: ['Content-Disposition'],
  });


  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Finances API')
    .setDescription('Description Project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const port = parseInt(process.env.PORT ?? '8080', 10);
  const host = process.env.HOST ?? '0.0.0.0';


  // Передаємо host як другий аргумент
  await app.listen(port, host, () => {
    Logger.log(`🚀 Server running on http://${host}:${port}`, 'Bootstrap');
    Logger.log(`📚 Swagger documentation: http://${host}:${port}/api`, 'Bootstrap');
  });
}

bootstrap().catch(console.error);
