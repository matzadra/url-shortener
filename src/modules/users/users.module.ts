import { Module } from "@nestjs/common";
import { UsersService } from "@modules/users/users.service";
import { UsersRepository } from "@modules/users/users.repository";
import { PrismaService } from "@db/prisma.service";

@Module({
  providers: [UsersService, UsersRepository, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
