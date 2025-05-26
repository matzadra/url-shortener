import { Injectable } from "@nestjs/common";
import { PrismaService } from "@db/prisma.service";
import { UserEntity } from "@modules/users/entities/user.entity";

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? UserEntity.fromPrisma(user) : null;
  }

  async findById(id: number): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? UserEntity.fromPrisma(user) : null;
  }

  async createFromEntity(entity: UserEntity): Promise<UserEntity> {
    const created = await this.prisma.user.create({
      data: {
        email: entity.email,
        password: entity.getPassword(),
      },
    });

    return new UserEntity(created);
  }
}
