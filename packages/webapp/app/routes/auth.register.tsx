import { parseWithYup } from '@conform-to/yup';
import { ClientActionFunctionArgs, json, redirect } from '@remix-run/react';
import { toast } from 'react-hot-toast';
import { Auth } from '../modules/Auth/Auth';
import * as authForm from '../modules/Auth/logic/authForm';
import { login } from '../services/queries/auth/login';
import { signUp } from '../services/queries/auth/signUp';
import { castError } from '../utils/parseClientResponseError';
import { requireAnonymous } from '../services/pocketbase/auth.client';

export async function clientLoader() {
  requireAnonymous();
  return null;
}

export async function clientAction(args: ClientActionFunctionArgs) {
  const { request } = args;
  const formData = await request.formData();
  const submission = parseWithYup(formData, {
    schema: authForm.signupSchema,
  });

  if (submission.status !== 'success') {
    return json(submission.reply());
  }
  const { value } = submission;

  try {
    await signUp({
      email: value.email,
      name: value.name,
      password: value.password,
    });

    await login({
      email: value.email,
      password: value.password,
    });
  } catch (error) {
    const appError = castError(error);
    toast.error(appError.message);
    // Required to avoid resetting the form.
    return json(submission.reply({ resetForm: false }));
  }

  return redirect('/');
}

export default function Login() {
  return <Auth mode="register" />;
}
