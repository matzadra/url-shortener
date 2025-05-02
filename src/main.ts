import { NestFactory } from "@nestjs/core";
import { AppModule } from "./core/app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();

  const config = app.get(ConfigService);
  const port = config.get<number>("PORT") ?? 3000;

  const configSwagger = new DocumentBuilder()
    .setTitle("URL Shortener API")
    .setDescription("Documentação da API de encurtamento de URLs")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup("api", app, document);

  await app.listen(port);
}
bootstrap();
