import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "@modules/users/users.service";
import { RegisterDto } from "@modules/users/dto/register.dto";
import { JwtAuthGuard } from "@modules/auth/guards/jwt.auth.guard";
import { UserId } from "@shared/decorators/user-id.decorator";
import { PublicUserDto } from "@modules/users/dto/public-user.dto";

@Controller("users")
export class UsersHandler {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(201)
  @Post()
  async register(@Body() dto: RegisterDto) {
    const created = await this.usersService.register(dto);
    return new PublicUserDto(created);
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  async getMe(@UserId() userId: number) {
    const user = await this.usersService.findById(userId);
    return new PublicUserDto(user);
  }
}
