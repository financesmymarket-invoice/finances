import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { config } from 'dotenv';
import { BigIntInterceptor } from './common/filters/bigint.interceptor';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new BigIntInterceptor());


  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // 🔹 Лог всіх запитів
  /*  app.use((req, res, next) => {
    console.log('➡️ Incoming request:', req.method, req.url);
    next();
  }); */

  // Глобальний фільтр помилок для всієї аплікації
  app.useGlobalFilters(new AllExceptionsFilter());

  // Swagger конфігурація
  const config = new DocumentBuilder()
    .setTitle('Finaces API')
    .setDescription('Description Project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 8080;
  const host = process.env.HOST || '0.0.0.0';
  
  await app.listen(port, () => {
    Logger.log(`🚀 Server running on http://${host}:${port}`, 'Bootstrap');
    Logger.log(
      `📚 Swagger documentation: http://${host}:${port}/api`,
      'Bootstrap',
    );
  });
}
bootstrap().catch(console.error);