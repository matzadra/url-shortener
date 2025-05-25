import { Module } from "@nestjs/common";
import { UrlsHandler } from "@modules/urls/urls.handler";
import { UrlsService } from "@modules/urls/urls.service";
import { UrlsRepository } from "@modules/urls/urls.repository";

@Module({
  controllers: [UrlsHandler],
  providers: [UrlsService, UrlsRepository],
})
export class UrlsModule {}
