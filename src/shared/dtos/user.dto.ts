import { IsNotEmpty } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  firstNme?: string;

  lastNme?: string;
}

export interface UserRO {
  userKey: number;
  email: string;
  createdDte: Date;
  token?: string;
}
