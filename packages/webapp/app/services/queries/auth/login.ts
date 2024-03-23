import { UserModel } from '../../../models/User.model';
import { pb } from '../../pocketbase/setup';
import { passThrough } from 'promise-passthrough';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';

interface ILoginBody {
  email: string;
  password: string;
}
export async function login(body: ILoginBody) {
  const data = await pb
    .collection<UserModel>('users')
    .authWithPassword(body.email, body.password)
    .catch(passThrough(parseClientResponseError));
  return data;
}
