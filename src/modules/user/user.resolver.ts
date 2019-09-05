import {
  Resolver,
  Query,
  Args,
  Mutation,
  Context,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../shared/auth.gaurd';
import { User } from '../../shared/entities';
import { UserService } from '../../shared/services/user.service';
import { UserDTO } from '../../shared/dtos/user.dto';

@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService,
  ) {}

  @Query()
  async users(@Args('page') page: number) {
    const users = await User.find({
      take: 25,
      skip: 25 * (page - 1),
    });
    return users.map(user => user.toResponseObject(false));
  }

  @Query()
  async user(@Args('email') email: string) {
    return User.findOne({email});
  }

  @Query()
  @UseGuards(new AuthGuard())
  async whoami(@Context('user') user) {
    const { email } = user;
    return User.findOne({email});
  }

  @Mutation()
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const user: UserDTO = { email, password };
    return await this.userService.login(user);
  }

  @Mutation()
  async register(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('firstNme') firstNme: string,
    @Args('lastNme') lastNme: string,
  ) {
    const user: UserDTO = { email, password, firstNme, lastNme };
    return await this.userService.register(user);
  }
}
