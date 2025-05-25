import { Injectable, NotFoundException } from "@nestjs/common";
import { UrlsRepository } from "@modules/urls/urls.repository";
import { CreateUrlDto } from "@modules/urls/dto/create-url.dto";
import { UpdateUrlDto } from "@modules/urls/dto/update-url.dto";
import { randomBytes } from "crypto";

@Injectable()
export class UrlsService {
  constructor(private readonly urlsRepository: UrlsRepository) {}

  async create(userId: number | null, createUrlDto: CreateUrlDto) {
    const shortUrl = randomBytes(3).toString("hex");
    return this.urlsRepository.create(userId, createUrlDto, shortUrl);
  }

  async findAll(userId: number) {
    return this.urlsRepository.findAll(userId);
  }

  async findOne(shortUrl: string) {
    return this.urlsRepository.findByShortUrl(shortUrl);
  }

  async update(id: number, updateUrlDto: UpdateUrlDto) {
    const url = await this.urlsRepository.findById(id);
    if (!url || url.deletedAt) {
      throw new NotFoundException("URL não encontrada para atualização");
    }
    return this.urlsRepository.updateById(id, updateUrlDto, url.userId);
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

  async incrementClicks(shortUrl: string) {
    return this.urlsRepository.incrementClicksByShortUrl(shortUrl);
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
