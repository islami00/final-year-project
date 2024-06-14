import UserModel, { User, type UserApi } from '../../../models/User.model';
import { forwardError } from '../../../utils/ErrorHandling/forwardError';
import { parseClientResponseError } from '../../../utils/ErrorHandling/parseClientResponseError';
import { pb } from '../../pocketbase/setup';

interface ILoginBody {
  email: string;
  password: string;
}
export async function login(body: ILoginBody): Promise<User> {
  const postPromise = pb
    .collection<UserApi>('users')
    .authWithPassword(body.email, body.password);

  const dataPromise = postPromise
    .then((value) => UserModel.fromApi(value.record))
    .catch(forwardError(parseClientResponseError));
  return dataPromise;
}
