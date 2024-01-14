// src/users/entities/user.entity.ts
import { Login } from '@prisma/client';

export class UserEntity implements Login {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  id: number;
  username: string;
  name: string;
  email: string;
  password: string;
}
