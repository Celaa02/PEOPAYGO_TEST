import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Backend Documentation test_PeopayGo')
    .setDescription('The test_PeopayGo API description')
    .setVersion('1.0')
    .addTag('users')
    .addTag('auth')
    .addTag('timesheet')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(4000);
}
bootstrap();
