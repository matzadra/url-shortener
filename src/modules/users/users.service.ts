import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { RegisterUserDto } from "@modules/users/dto/register-user.dto";
import { UserEntity } from "@modules/users/entities/user.entity";
import { UsersRepository } from "@modules/users/users.repository";
import {
  assertUserExists,
  assertUserNotFound,
} from "@shared/validators/assert-user";
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async registerNewUser(dto: RegisterUserDto): Promise<UserEntity> {
    const user = await this.usersRepository.findByEmail(dto.email);
    assertUserExists(user);
    const entity = await UserEntity.createNew(dto.email, dto.password);
    return this.usersRepository.createFromEntity(entity);
  }

  async findById(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findById(id);
    assertUserNotFound(user);
    return user;
  }
}
