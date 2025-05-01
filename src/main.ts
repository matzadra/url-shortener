import { NestFactory } from "@nestjs/core";
import { AppModule } from "./core/app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Garante que shutdown hooks (como Prisma) funcionem corretamente
  app.enableShutdownHooks();

  // Acessa o ConfigService para pegar a porta com fallback
  const config = app.get(ConfigService);
  const port = config.get<number>("PORT") ?? 3000;

  await app.listen(port);
}
bootstrap();
