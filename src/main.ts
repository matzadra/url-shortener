import { NestFactory } from "@nestjs/core";
import { AppModule } from "./core/app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();

  const config = app.get(ConfigService);
  const port = config.get<number>("PORT") ?? 3000;

  await app.listen(port);
}
bootstrap();
