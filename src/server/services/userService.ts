import { User } from '../_models/user';

class UserService {
  private user: User = new User();

  public get = (): User => this.user;
}

export const userService = new UserService();