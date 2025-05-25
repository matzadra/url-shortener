import { Body, Controller, Post, HttpCode } from "@nestjs/common";
import { AuthService } from "@modules/auth/auth.service";
import { UsersService } from "@modules/users/users.service";
import { RegisterDto } from "@modules/auth/dto/register.dto";
import { LoginDto } from "@modules/auth/dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @HttpCode(201)
  @Post("register")
  async register(@Body() registerDto: RegisterDto) {
    return this.usersService.register(registerDto);
  }

  @HttpCode(200)
  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
