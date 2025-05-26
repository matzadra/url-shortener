import { UserEntity } from "@modules/users/entities/user.entity";
import { ConflictException, NotFoundException } from "@nestjs/common";

export function assertUserExists(
  user: UserEntity | null,
  message: string = "Usuário já registrado"
): asserts user is UserEntity {
  if (!user) {
    throw new ConflictException(message);
  }
}

export function assertUserNotFound(
  user: UserEntity | null,
  message: string = "Usuário não encontrado."
): asserts user is UserEntity {
  if (!user) {
    throw new NotFoundException(message);
  }
}
