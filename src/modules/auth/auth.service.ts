import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "@modules/auth/dto/login.dto";
import { UsersService } from "@modules/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    const isValid = await user.comparePassword(dto.password);

    if (!isValid) {
      throw new UnauthorizedException("Credenciais inválidas.");
    }

    const token = await this.generateToken(user);
    return { accessToken: token };
  }

  private generateToken(user: { id: number; email: string }) {
    return this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });
  }
}
