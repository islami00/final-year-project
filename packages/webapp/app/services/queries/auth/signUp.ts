import { User, type UserCreate } from '../../../models/User.model';
import { forwardError } from '../../../utils/forwardError';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';
import { pb } from '../../pocketbase/setup';

interface ISignUpBody {
  email: string;
  password: string;
  name: string;
}
export async function signUp(args: ISignUpBody): Promise<User> {
  const { password, name, email } = args;
  const data: UserCreate = {
    password,
    passwordConfirm: password,
    name,
    // Can include more custom data.
    emailVisibility: true,
    email,
  };
  const authData = await pb
    .collection<User>('users')
    .create(data)
    .catch(forwardError(parseClientResponseError));
  return authData;
}
