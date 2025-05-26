import { UserEntity } from "@modules/users/entities/user.entity";

export class UserPublicDto {
  static fromEntity(user: UserEntity): UserPublicDto {
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  id: number;
  email: string;
  createdAt: Date;
}
