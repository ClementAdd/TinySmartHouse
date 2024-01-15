import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './types/create-user.dto';
import { UpdateUserDto } from './types/update-user.dto';
import { generateUsername } from 'src/utils/username-generator';
import { exclude } from 'src/utils/exclude-field';

const roundsOfHashing = Number(process.env.HASHING_ROUNDS_NUM) || 10;

@Injectable()
export class UsersService {
  returnedFields = { id: true, email: true, username: true, name: true };
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, roundsOfHashing);

    const username = generateUsername(name);

    return this.prisma.login.create({
      data: {
        email,
        username,
        name,
        password: hashedPassword,
      },
      select: this.returnedFields,
    });
  }

  findAll() {
    const users = this.prisma.login.findMany()
    const withoutPwd = exclude(users, ['password'])
    return this.prisma.login.findMany({
      select: this.returnedFields,
    });
  }

  findOne(id: number) {
    return this.prisma.login.findUnique({
      where: { id },
      select: this.returnedFields,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }

    return this.prisma.login.update({
      where: { id },
      data: updateUserDto,
      select: this.returnedFields,
    });
  }

  remove(id: number) {
    return this.prisma.login.delete({
      where: { id },
      select: this.returnedFields,
    });
  }
}
