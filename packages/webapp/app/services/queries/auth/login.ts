import type { RecordAuthResponse } from 'pocketbase';
import { User } from '../../../models/User.model';
import { forwardError } from '../../../utils/forwardError';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';
import { pb } from '../../pocketbase/setup';

interface ILoginBody {
  email: string;
  password: string;
}
export async function login(
  body: ILoginBody
): Promise<RecordAuthResponse<User>> {
  const data = await pb
    .collection<User>('users')
    .authWithPassword(body.email, body.password)
    .catch(forwardError(parseClientResponseError));
  return data;
}
