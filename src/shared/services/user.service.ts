import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserDTO } from '../dtos/user.dto';

@Injectable()
export class UserService {
  async read(email: string) {
    const user = await User.findOne({
      where: { email },
    });
    return user.toResponseObject(false);
  }

  async login(data: UserDTO) {
    const { email, password } = data;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid email/password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user.toResponseObject();
  }

  async register(data: UserDTO) {
    const { email } = data;
    let user = await User.findOne({ where: { email } });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    user = await User.create(data);
    await user.save();
    return user.toResponseObject();
  }
}
