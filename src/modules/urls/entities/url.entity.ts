import { randomBytes } from "crypto";

export class UrlEntity {
  private readonly shortUrl: string;

  constructor(
    public readonly originalUrl: string,
    public readonly userId: number | null,
    shortUrl?: string
  ) {
    this.shortUrl = shortUrl ?? UrlEntity.generateShortCode();
  }

  static generateShortCode(): string {
    return randomBytes(3).toString("hex");
  }

  getShortUrl(): string {
    return this.shortUrl;
  }

  toPersistence(): {
    originalUrl: string;
    shortUrl: string;
    userId: number | null;
  } {
    return {
      originalUrl: this.originalUrl,
      shortUrl: this.shortUrl,
      userId: this.userId,
    };
  }
}
