import { IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUrlDto {
  @ApiProperty({
    example: "https://novo-destino.com/xyz",
    description: "Novo endereço de destino da URL encurtada",
  })
  @IsUrl()
  originalUrl: string;
}
