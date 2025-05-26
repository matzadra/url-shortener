import { Injectable, NotFoundException } from "@nestjs/common";
import { UrlsRepository } from "@modules/urls/urls.repository";
import { UrlEntity } from "@modules/urls/entities/url.entity";
import { UrlDto } from "@modules/urls/dto/url.dto";

@Injectable()
export class UrlsService {
  constructor(private readonly urlsRepository: UrlsRepository) {}

  async create(userId: number | null, dto: UrlDto) {
    const entity = new UrlEntity(dto.originalUrl, userId);
    return this.urlsRepository.createFromEntity(entity);
  }

  async findAll(userId: number) {
    return this.urlsRepository.findAll(userId);
  }

  async findOne(shortUrl: string) {
    return this.urlsRepository.findByShortUrl(shortUrl);
  }

  async update(id: number, dto: UrlDto) {
    const url = await this.urlsRepository.findById(id);
    if (!url || url.deletedAt) {
      throw new NotFoundException("URL não encontrada para atualização");
    }
    return this.urlsRepository.updateById(id, {
      originalUrl: dto.originalUrl,
      userId: url.userId,
    });
  }

  async remove(id: number, userId: number) {
    const url = await this.urlsRepository.findById(id);
    if (!url || url.deletedAt || url.userId !== userId) {
      throw new NotFoundException(
        "URL não encontrada, já excluída ou não pertence ao usuário"
      );
    }
    return this.urlsRepository.softDeleteById(id);
  }

  async handleRedirect(shortUrl: string) {
    const url = await this.urlsRepository.findByShortUrl(shortUrl);
    if (!url) {
      throw new NotFoundException("URL não encontrada");
    }
    await this.urlsRepository.incrementClicksByShortUrl(shortUrl);
    return url;
  }
}
