import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtPayload } from "@modules/auth/types/jwt-payload.type";

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard("jwt") {
  override handleRequest<TUser = any>(
    err: unknown,
    user: unknown,
    info: unknown,
    context: ExecutionContext,
    status?: unknown
  ): TUser | null {
    if (user && typeof user === "object" && "sub" in user && "email" in user) {
      return user as TUser;
    }
    return null;
  }
}
