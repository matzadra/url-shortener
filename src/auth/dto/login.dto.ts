import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    example: "usuario@email.com",
    description: "Email do usuário",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "senhaSegura123",
    description: "Senha do usuário",
  })
  @IsString()
  password: string;
}
