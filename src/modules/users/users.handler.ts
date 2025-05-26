import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "@modules/users/users.service";
import { UserRegisterDto } from "@modules/users/dto/register-user.dto";
import { JwtAuthGuard } from "@modules/auth/guards/jwt.auth.guard";
import { UserId } from "@shared/decorators/user-id.decorator";
import { UserPublicDto } from "@modules/users/dto/public-user.dto";

@Controller("users")
export class UsersHandler {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(201)
  @Post()
  async register(@Body() dto: UserRegisterDto) {
    const created = await this.usersService.registerNewUser(dto);
    return UserPublicDto.fromEntity(created);
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  async getMe(@UserId() userId: number) {
    const user = await this.usersService.findById(userId);
    return UserPublicDto.fromEntity(user);
  }
}
