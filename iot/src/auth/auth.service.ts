import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/types/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthMethod } from './constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async signUp(createUserDto: CreateUserDto, authMethod: AuthMethod) {
    const user = await this.prisma.login.findUnique({
      where: { email: createUserDto.email },
    });

    if (user && authMethod === AuthMethod.JWT) {
      throw new ConflictException(
        `There is already an account with this email: ${createUserDto.email}`,
      );
    }

    if (user && authMethod === AuthMethod.OAUTH) {
      return {
        accessToken: this.jwtService.sign({ userId: user.id }),
      };
    }

    const newUser = await this.userService.create(createUserDto);

    const data = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      username: newUser.username,
    };

    return {
      data,
      accessToken: this.jwtService.sign({ userId: newUser.id }),
    };
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.prisma.login.findUnique({
      where: { email: email },
    });
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
