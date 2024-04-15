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
export interface UserApi {
  username: string;
  email: string;
  id: string;
  name: string;
  avatar: string;
  dashboardOrganisation: string;
}
export interface User {
  username: UserApi['username'];
  email: UserApi['email'];
  id: UserApi['id'];
  name: UserApi['name'];
  avatar: string | null;
  /** Dashboard organisation. Defaults to the First Organisation assigned on login if not defined */
  dashboardOrganisation: string | null;
}

const coerceStringToNull = (v: unknown) => v || null;
const userSchema = z.object({
  username: z.string(),
  email: z.string(),
  id: z.string(),
  name: z.string(),
  avatar: z.preprocess(coerceStringToNull, z.string().nullable()),
  dashboardOrganisation: z.preprocess(
    coerceStringToNull,
    z.string().nullable()
  ),
}) satisfies ZodOf<User>;

class UserConverter extends Converter<UserApi, User> {
  fromApi(from: UserApi): Promise<User> {
    return userSchema.parseAsync(from);
  }
}

export default new UserConverter();
