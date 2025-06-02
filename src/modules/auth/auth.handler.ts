import { Body, Controller, Post, HttpCode } from "@nestjs/common";
import { AuthService } from "@modules/auth/auth.service";
import { LoginDto } from "@modules/auth/dto/login.dto";
import { AuthResponseDto } from "@modules/auth/dto/auth-response.dto";
import { ApiTags, ApiResponse } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthHandler {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post("login")
  @ApiResponse({ status: 200, type: AuthResponseDto })
  async login(@Body() dto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(dto);
  }
}
