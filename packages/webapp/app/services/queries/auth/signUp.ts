import { UserModel } from '../../../models/User.model';
import { forwardError } from '../../../utils/forwardError';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';
import { pb } from '../../pocketbase/setup';

interface ISignUpBody {
  email: string;
  password: string;
  name: string;
}
export async function signUp(args: ISignUpBody): Promise<UserModel> {
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
    .catch(forwardError(parseClientResponseError));
  return authData;
}
