import { Body, Controller, Post, HttpCode } from "@nestjs/common";
import { AuthService } from "@modules/auth/auth.service";
import { RegisterDto } from "@modules/auth/dto/register.dto";
import { LoginDto } from "@modules/auth/dto/login.dto";

@Controller("auth")
export class AuthHandler {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post("register")
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @HttpCode(200)
  @Post("login")
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
