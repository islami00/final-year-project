import { z } from 'zod';
import Converter from './Converter.model';
import type { ZodOf } from './types';

export interface UserCreate {
  password: string;
  passwordConfirm: string;
  name: string;

  emailVisibility: boolean;
  email: string;
}
export type UserApi = User;
export interface User {
  username: string;
  email: string;
  id: string;
  name: string;
  avatar: string | null;
}

const userSchema = z.object({
  username: z.string(),
  email: z.string(),
  id: z.string(),
  name: z.string(),
  avatar: z.string().nullable(),
}) satisfies ZodOf<User>;

class UserConverter extends Converter<UserApi, User> {
  fromApi(from: UserApi): Promise<User> {
    return userSchema.parseAsync(from);
  }
}

export default new UserConverter();
