import * as bcrypt from "bcryptjs";

export class UserEntity {
  constructor(
    public readonly id: number,
    public readonly email: string,
    private readonly password: string,
    public readonly createdAt: Date
  ) {}

  static async create(email: string, rawPassword: string): Promise<UserEntity> {
    const hash = await bcrypt.hash(rawPassword, 10);
    return new UserEntity(0, email, hash, new Date());
  }

  async comparePassword(raw: string): Promise<boolean> {
    return bcrypt.compare(raw, this.password);
  }

  getPassword(): string {
    return this.password;
  }
}
