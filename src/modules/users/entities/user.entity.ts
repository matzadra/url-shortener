import * as bcrypt from "bcryptjs";

export type UserEntityProps = {
  id?: number;
  email: string;
  password: string;
  createdAt?: Date;
};

export class UserEntity {
  public readonly id: number;
  public readonly email: string;
  private readonly password: string;
  public readonly createdAt: Date;

  constructor(props: UserEntityProps) {
    this.id = props.id ?? 0;
    this.email = props.email;
    this.password = props.password;
    this.createdAt = props.createdAt ?? new Date();
  }

  static fromPrisma(raw: UserEntityProps) {
    return new UserEntity(raw);
  }

  static async createNew(
    email: string,
    rawPassword: string
  ): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    return new UserEntity({ email, password: hashedPassword });
  }

  async comparePassword(raw: string): Promise<boolean> {
    return bcrypt.compare(raw, this.password);
  }

  getPassword(): string {
    return this.password;
  }
}
