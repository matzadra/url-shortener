import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { RegisterDto } from "@modules/users/dto/register.dto";
import { UserEntity } from "@modules/users/entities/user.entity";
import { UsersRepository } from "@modules/users/users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async register(dto: RegisterDto): Promise<UserEntity> {
    const existing = await this.usersRepository.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException("Usuário já registrado.");
    }

    const entity = await UserEntity.create(dto.email, dto.password);
    return this.usersRepository.createFromEntity(entity);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException("Usuário não encontrado.");
    }

    return new UserEntity(user.id, user.email, user.password, user.createdAt);
  }

  async findById(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundException("Usuário não encontrado.");
    return new UserEntity(user.id, user.email, user.password, user.createdAt);
  }
}
