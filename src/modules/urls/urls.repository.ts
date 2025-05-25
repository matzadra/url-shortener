import { Injectable } from "@nestjs/common";
import { PrismaService } from "@db/prisma.service";
import { UrlEntity } from "@modules/urls/entities/url.entity";

@Injectable()
export class UrlsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createFromEntity(entity: UrlEntity) {
    return this.prisma.url.create({
      data: entity.toPersistence(),
    });
  }

  async findAll(userId: number) {
    return this.prisma.url.findMany({
      where: { userId, deletedAt: null },
    });
  }

  async findByShortUrl(shortUrl: string) {
    return this.prisma.url.findFirst({
      where: { shortUrl, deletedAt: null },
    });
  }

  async findById(id: number) {
    return this.prisma.url.findUnique({ where: { id } });
  }

  async updateById(id: number, data: { originalUrl: string; userId: number }) {
    return this.prisma.url.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  async softDeleteById(id: number) {
    return this.prisma.url.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async incrementClicksByShortUrl(shortUrl: string) {
    return this.prisma.url.updateMany({
      where: { shortUrl, deletedAt: null },
      data: {
        clicks: { increment: 1 },
      },
    });
  }
}
