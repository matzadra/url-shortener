import { UserEntity } from "@modules/users/entities/user.entity";

export class AuthenticatedUserDto {
  constructor(public readonly id: number) {}

  static fromEntity(user: UserEntity) {
    return new AuthenticatedUserDto(user.id);
  }
}
