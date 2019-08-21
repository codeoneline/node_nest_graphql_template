import {
  Resolver,
  Query,
  Args,
  Mutation,
  Context,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../shared/auth.gaurd';
import { UserService } from '../../shared/services/user.service';
import { UserDTO } from '../../shared/dtos/user.dto';

@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService,
  ) {}

  @Query()
  async users(@Args('page') page: number) {
    return await this.userService.showAll(page);
  }

  @Query()
  async user(@Args('email') email: string) {
    return await this.userService.read(email);
  }

  @Query()
  @UseGuards(new AuthGuard())
  async whoami(@Context('user') user) {
    const { email } = user;
    return await this.userService.read(email);
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
