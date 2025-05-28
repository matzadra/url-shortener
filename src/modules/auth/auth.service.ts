import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "@modules/auth/dto/login.dto";
import { AuthResponseDto } from "@modules/auth/dto/auth-response.dto";
import { UsersService } from "@modules/users/users.service";
import { UserEntity } from "@modules/users/entities/user.entity";
import { assertUserCredentials } from "@shared/validators/assert-auth";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.usersService.findByEmail(dto.email);
    await assertUserCredentials(user, dto.password);
    const token = await this.generateToken(user);
    return { accessToken: token };
  }

  private generateToken(user: UserEntity) {
    return this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });
  }
}
