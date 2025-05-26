import { NotFoundException, ForbiddenException } from "@nestjs/common";
import { Url } from "@prisma/client";

export function assertUrlFound(
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
