import { Module } from "@nestjs/common";
import { UsersService } from "@modules/users/users.service";
import { UsersRepository } from "@modules/users/users.repository";
import { UsersHandler } from "@modules/users/users.handler";

@Module({
  controllers: [UsersHandler],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
