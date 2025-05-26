import {
  NotFoundException,
  ForbiddenException,
  BadGatewayException,
} from "@nestjs/common";
import { Url } from "@prisma/client";
import axios from "axios";

export function assertUrlExists(
  url: Url | null,
  message: string = "URL não encontrada"
): asserts url is Url {
  if (!url || url.deletedAt) {
    throw new NotFoundException(message);
  }
}

export function assertUrlOwner(
  url: Url,
  userId: number,
  message = "Você não tem permissão para alterar essa URL"
): void {
  if (url.userId !== userId) {
    throw new ForbiddenException(message);
  }
}

export function assertShortUrlExists(
  url: Url | null,
  message: string = "Short URL não encontrada"
): asserts url is Url {
  if (!url) {
    throw new NotFoundException(message);
  }
}

export async function assertOriginalUrlReachable(url: string): Promise<void> {
  try {
    await axios.head(url, { timeout: 1500 });
  } catch {
    throw new BadGatewayException("URL de destino inválida ou inacessível");
  }
}
