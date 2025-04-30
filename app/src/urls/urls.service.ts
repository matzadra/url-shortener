import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number | null, createUrlDto: CreateUrlDto) {
    const shortUrl = randomBytes(3).toString('hex');

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

  async findOne(shortUrl: string) {
    return this.prisma.url.findFirst({
      where: { shortUrl, deletedAt: null },
    });
  }

  async update(id: number, updateUrlDto: UpdateUrlDto) {
    return this.prisma.url.update({
      where: { id },
      data: {
        originalUrl: updateUrlDto.originalUrl,
        updatedAt: new Date(),
      },
    });
  }

  async remove(id: number) {
    return this.prisma.url.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async incrementClicks(shortUrl: string) {
    await this.prisma.url.updateMany({
      where: { shortUrl, deletedAt: null },
      data: { clicks: { increment: 1 } },
    });
  }
}
