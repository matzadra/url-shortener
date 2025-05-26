import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "@modules/auth/auth.service";
import { AuthHandler } from "@modules/auth/auth.handler";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "@modules/auth/strategies/jwt.strategy";
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
  controllers: [AuthHandler],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
