import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt.guard';
import { Request, Response } from 'express';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @UseGuards(OptionalJwtAuthGuard)
  @Post()
  create(@Req() req: Request, @Body() createUrlDto: CreateUrlDto) {
    const userId = req.user?.['userId'] || null;
    return this.urlsService.create(userId, createUrlDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: Request) {
    const userId = req.user['userId'];
    return this.urlsService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
    return this.urlsService.update(Number(id), updateUrlDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.urlsService.remove(Number(id));
  }

  @Get('/:shortUrl')
  async redirect(@Param('shortUrl') shortUrl: string, @Res() res: Response) {
    const url = await this.urlsService.findOne(shortUrl);

    if (!url) {
      return res.status(404).send('URL não encontrada.');
    }

    await this.urlsService.incrementClicks(shortUrl);

    return res.redirect(url.originalUrl);
  }
}
>>>>>>> 9c0bd92 ([feature]: endpoint POST /urls aceita usuários autenticados e anônimos)
