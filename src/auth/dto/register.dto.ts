import { IsEmail, IsString, MinLength, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({
    example: "novo@email.com",
    description: "Email do novo usuário",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "senhaSegura123",
    minLength: 6,
    maxLength: 64,
    description: "Senha entre 6 e 64 caracteres",
  })
  @IsString()
  @MinLength(6)
  @MaxLength(64)
  password: string;
}
