import { pb } from '../../pocketbase/pocketbase.client';
import { UserModel } from '../../../models/User.model';

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
  const authData = await pb.collection<UserModel>('users').create(data);
  return authData;
}
