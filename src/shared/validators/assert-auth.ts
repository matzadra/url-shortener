import { UserEntity } from "@modules/users/entities/user.entity";
import { NotFoundException } from "@nestjs/common";

export async function assertUserCredencials(
  user: UserEntity | null,
  password: string,
  message: string = "Credenciais inválidas."
): Promise<void> {
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    throw new NotFoundException(message);
  }
}
