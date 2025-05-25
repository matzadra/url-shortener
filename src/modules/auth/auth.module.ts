import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "@modules/auth/auth.service";
import { AuthController } from "@modules/auth/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "@modules/auth/strategies/jwt.strategy";
import { PrismaService } from "@db/prisma.service";
import { UsersModule } from "@modules/users/users.module";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "1d" },
      }),
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService],
})
export class AuthModule {}
