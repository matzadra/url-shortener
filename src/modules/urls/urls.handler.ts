import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  UseGuards,
  Redirect,
  ParseIntPipe,
} from "@nestjs/common";
import { UrlsService } from "@modules/urls/urls.service";
import { UrlDto } from "@modules/urls/dto/url.dto";
import { JwtAuthGuard } from "@modules/auth/guards/jwt.auth.guard";
import { OptionalJwtAuthGuard } from "@modules/auth/guards/optional-jwt.guard";
import { UserId } from "@shared/decorators/user-id.decorator";

@Controller("urls")
export class UrlsHandler {
  constructor(private readonly urlsService: UrlsService) {}

  @HttpCode(201)
  @UseGuards(OptionalJwtAuthGuard)
  @Post()
  create(@UserId() userId: number | null, @Body() dto: UrlDto) {
    return this.urlsService.create(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@UserId() userId: number) {
    return this.urlsService.findAll(userId);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Put(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UrlDto) {
    return this.urlsService.update(id, dto);
  }

  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number, @UserId() userId: number) {
    return this.urlsService.remove(id, userId);
  }

  @Get(":shortUrl")
  @Redirect()
  async redirect(@Param("shortUrl") shortUrl: string) {
    const url = await this.urlsService.handleRedirect(shortUrl);
    return { url: url.originalUrl };
  }
}
