import { Injectable } from "@nestjs/common";
import { PrismaService } from "@db/prisma.service";
import { CreateUrlDto } from "@modules/urls/dto/create-url.dto";
import { UpdateUrlDto } from "@modules/urls/dto/update-url.dto";

@Injectable()
export class UrlsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: number | null,
    createUrlDto: CreateUrlDto,
    shortUrl: string
  ) {
    return this.prisma.url.create({
      data: {
        originalUrl: createUrlDto.originalUrl,
        shortUrl,
        userId,
      },
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

  async updateById(id: number, updateUrlDto: UpdateUrlDto, userId: number) {
    return this.prisma.url.update({
      where: { id },
      data: {
        originalUrl: updateUrlDto.originalUrl,
        updatedAt: new Date(),
        userId,
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
      data: { clicks: { increment: 1 } },
    });
  }
}
