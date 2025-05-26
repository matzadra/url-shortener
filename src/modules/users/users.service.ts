import { Injectable } from "@nestjs/common";
import { UserRegisterDto } from "@modules/users/dto/register-user.dto";
import { UserEntity } from "@modules/users/entities/user.entity";
import { UsersRepository } from "@modules/users/users.repository";
import {
  assertUserNotFound,
  assertUserAlreadyExists,
} from "@shared/validators/assert-user";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async registerNewUser(dto: UserRegisterDto): Promise<UserEntity> {
    const existing = await this.usersRepository.findByEmail(dto.email);
    assertUserAlreadyExists(existing);

    const entity = await UserEntity.createNew(dto.email, dto.password);
    return this.usersRepository.create(entity);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.usersRepository.findByEmail(email);
    assertUserNotFound(user);
    return user;
  }

  async findById(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findById(id);
    assertUserNotFound(user);
    return user;
  }
}
