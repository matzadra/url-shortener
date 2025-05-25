import { Module } from "@nestjs/common";
import { UrlsController } from "@modules/urls/urls.controller";
import { UrlsService } from "@modules/urls/urls.service";

@Module({
  controllers: [UrlsController],
  providers: [UrlsService],
})
export class UrlsModule {}
