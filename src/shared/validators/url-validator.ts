import { BadGatewayException } from "@nestjs/common";
import axios from "axios";

export async function assertOriginalUrlReachable(url: string): Promise<void> {
  try {
    await axios.head(url, { timeout: 1500 });
  } catch {
    throw new BadGatewayException("URL de destino inválida ou inacessível");
  }
}
