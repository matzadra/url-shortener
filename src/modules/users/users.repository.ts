import { Injectable } from "@nestjs/common";
import { PrismaService } from "@db/prisma.service";
import { UserEntity } from "@modules/users/entities/user.entity";

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async createFromEntity(entity: UserEntity) {
    const created = await this.prisma.user.create({
      data: {
        email: entity.email,
        password: entity.getPassword(),
      },
    });

    return new UserEntity(
      created.id,
      created.email,
      created.password,
      created.createdAt
    );
  }
}
