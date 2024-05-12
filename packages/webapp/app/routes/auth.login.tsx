import { parseWithYup } from '@conform-to/yup';
import { type ClientActionFunctionArgs } from '@remix-run/react';
import { toast } from 'react-hot-toast';
import { Auth } from '../modules/Auth/Auth';
import * as authForm from '../modules/Auth/logic/authForm';
import { requireAnonymous } from '../services/pocketbase/auth';
import { login } from '../services/queries/auth/login';
import { castError } from '../utils/ErrorHandling/parseClientResponseError';

export async function clientLoader() {
  requireAnonymous();
  return null;
}
export async function clientAction(args: ClientActionFunctionArgs) {
  const { request } = args;
  const formData = await request.formData();
  const submission = parseWithYup(formData, {
    schema: authForm.loginSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }
  const { value } = submission;

  try {
    const user = await login({
      email: value.email,
      password: value.password,
    });
    return { user };
  } catch (error) {
    const appError = castError(error);
    toast.error(appError.message);
    return submission.reply({ resetForm: false });
  }
}
export default function Login() {
  return <Auth mode="login" />;
}
