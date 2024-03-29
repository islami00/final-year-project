import Converter from './Converter.model';
import * as yup from 'yup';

export type UserApi = User;
export interface User {
  username: string;
  email: string;
  id: string;
  name: string;
  avatar: string | null;
}

const userSchema: yup.ObjectSchema<User> = yup.object({
  username: yup.string().required(),
  email: yup.string().required(),
  id: yup.string().required(),
  name: yup.string().required(),
  avatar: yup.string().nullable().defined(),
});

class UserConverter extends Converter<UserApi, User> {
  fromApi(from: UserApi): Promise<User> {
    return userSchema.validate(from, { stripUnknown: true });
  }
}

export default new UserConverter();
