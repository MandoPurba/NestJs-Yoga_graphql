import { AppsModule } from './apps/apps.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppsModule);
  await app.listen(3000);
}
bootstrap();
