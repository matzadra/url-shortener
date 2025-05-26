import { UserEntity } from "@modules/users/entities/user.entity";

export class PublicUserDto {
  id: number;
  email: string;
  createdAt: Date;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.email = user.email;
    this.createdAt = user.createdAt;
  }
}
