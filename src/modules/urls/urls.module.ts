import { Module } from "@nestjs/common";
import { UrlsHandler } from "@modules/urls/urls.handler";
import { UrlsService } from "@modules/urls/urls.service";

@Module({
  controllers: [UrlsHandler],
  providers: [UrlsService],
})
export class UrlsModule {}
