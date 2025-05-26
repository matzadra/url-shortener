import { IsEmail, IsString, MinLength, MaxLength } from "class-validator";

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(64)
  password: string;
}
