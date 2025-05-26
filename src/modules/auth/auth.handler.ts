import { Body, Controller, Post, HttpCode } from "@nestjs/common";
import { AuthService } from "@modules/auth/auth.service";
import { LoginDto } from "@modules/auth/dto/login.dto";

@Controller("auth")
export class AuthHandler {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post("login")
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
