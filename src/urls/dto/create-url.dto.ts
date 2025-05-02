import { IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUrlDto {
  @ApiProperty({
    example: "https://exemplo.com/artigo/abc",
    description: "Endereço original que será encurtado",
  })
  @IsUrl()
  originalUrl: string;
}
