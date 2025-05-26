import { Injectable, NotFoundException } from "@nestjs/common";
import { UrlsRepository } from "@modules/urls/urls.repository";
import { UrlEntity } from "@modules/urls/entities/url.entity";
import { UrlDto } from "@modules/urls/dto/url.dto";
import { assertUrlOwner, assertUrlFound } from "@shared/validators/assert-url";
import { Url } from "@prisma/client";
@Injectable()
export class UrlsService {
  constructor(private readonly urlsRepository: UrlsRepository) {}

  async create(userId: number | null, dto: UrlDto) {
    const entity = new UrlEntity(dto.originalUrl, userId);
    return this.urlsRepository.createFromEntity(entity);
  }

  async findAll(userId: number): Promise<Url[]> {
    return this.urlsRepository.findAll(userId);
  }

  async findOne(shortUrl: string): Promise<Url> {
    return this.urlsRepository.findByShortUrl(shortUrl);
  }

  async update(id: number, dto: UrlDto): Promise<Url> {
    const url = await this.urlsRepository.findById(id);
    assertUrlFound(url);
    return this.urlsRepository.updateById(id, {
      originalUrl: dto.originalUrl,
      userId: url.userId,
    });
  }

  async remove(id: number, userId: number): Promise<Url> {
    const url = await this.urlsRepository.findById(id);
    assertUrlFound(url);
    assertUrlOwner(url, userId);

    return this.urlsRepository.softDeleteById(id);
  }

  async handleRedirect(shortUrl: string): Promise<Url> {
    const url = await this.urlsRepository.findByShortUrl(shortUrl);
    assertUrlFound(url);
    await this.urlsRepository.incrementClicksByShortUrl(shortUrl);
    return url;
  }
}
