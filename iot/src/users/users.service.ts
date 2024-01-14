import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './types/create-user.dto';
import { UpdateUserDto } from './types/update-user.dto';
import { generateUsername } from 'src/utils/username-generator';

const roundsOfHashing = Number(process.env.HASHING_ROUNDS_NUM) || 10;

@Injectable()
export class UsersService {
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
    });
  }

  findAll() {
    return this.prisma.login.findMany();
  }

  findOne(id: number) {
    return this.prisma.login.findUnique({ where: { id } });
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
    });
  }

  remove(id: number) {
    return this.prisma.login.delete({ where: { id } });
  }
}
