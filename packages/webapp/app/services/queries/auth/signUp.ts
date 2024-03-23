import { pb } from '../../pocketbase/setup';
import { UserModel } from '../../../models/User.model';
import { passThrough } from 'promise-passthrough';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';

interface ISignUpBody {
  email: string;
  password: string;
  name: string;
}
export async function signUp(args: ISignUpBody) {
  const { password, name, email } = args;
  const data = {
    password,
    passwordConfirm: password,
    name,
    email,
  };
  const authData = await pb
    .collection<UserModel>('users')
    .create(data)
    .catch(passThrough(parseClientResponseError));
  return authData;
}
