import type { ActionFunctionArgs } from '@remix-run/node';
import { Auth } from '../modules/Auth/Auth';

export async function clientAction(args: ActionFunctionArgs) {
  const formData = await args.request.json();

  const obj = Object.fromEntries(formData);
  obj.v;
  console.log(formData);
}
export default function Login() {
  return <Auth mode="login" />;
}
