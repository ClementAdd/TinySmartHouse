import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/types/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthMethod, MAIL_SERVICE } from './constants';
import * as bcrypt from 'bcrypt';
import { LoginOutput } from './types/login.dto';
import { SignupOutput } from './types/signup.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @Inject(MAIL_SERVICE) private readonly mailClient: ClientProxy,
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async signUp(
    createUserDto: CreateUserDto,
    authMethod: AuthMethod,
  ): Promise<SignupOutput | LoginOutput> {
    if (
      !createUserDto.email ||
      !createUserDto.name ||
      !createUserDto.password
    ) {
      throw new BadRequestException();
    }

    const user = await this.prisma.login.findUnique({
      where: { email: createUserDto.email },
    });

    if (user && authMethod === AuthMethod.CLASSIC) {
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

    const accessToken = this.jwtService.sign({ userId: newUser.id });

    Logger.log('Sending message to send_mail_queue . . .');
    this.mailClient.emit('send_mail_queue', { ...data, accessToken });

    return {
      data,
      accessToken,
    };
  }

  async login(email: string, password: string): Promise<LoginOutput> {
    if (!email || !password) throw new BadRequestException();

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
