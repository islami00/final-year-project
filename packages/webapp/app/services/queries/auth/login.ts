import { UserModel } from '../../../models/User.model';
import { pb } from '../../pocketbase/pocketbase.client';

interface ILoginBody {
  email: string;
  password: string;
}
export async function login(body: ILoginBody) {
  const data = await pb
    .collection<UserModel>('users')
    .authWithPassword(body.email, body.password);
  return data;
}
