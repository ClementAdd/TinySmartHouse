import { CreateUserDto } from 'src/users/types/create-user.dto';

export type SignUpDto = CreateUserDto;

export type SignupOutput = {
  data: {
    id: number;
    email: string;
    name: string;
    username: string;
  };
  accessToken: string;
};
