import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { TransformInterceptor } from './shared/interceptors/transform.interceptor';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();
  
  // Cấu hình global prefix
  app.setGlobalPrefix('api/v1');
  
  // Thêm middleware để redirect từ /api sang /api/v1
  app.use('/api', (req: Request, res: Response) => {
    // Kiểm tra để không redirect nếu đã là /api/v1
    if (!req.url.startsWith('/v1')) {
      return res.redirect(301, `/api/v1${req.url}`);
    }
  });
  
  // Cấu hình validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  
  // Đăng ký global filter xử lý lỗi
  app.useGlobalFilters(new HttpExceptionFilter());
  
  // Đăng ký global interceptor chuyển đổi response
  app.useGlobalInterceptors(new TransformInterceptor());
  
  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle('English Learning API')
    .setDescription('API documentation for English Learning application')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  
  // Khởi chạy ứng dụng
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap(); 