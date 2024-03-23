import * as yup from 'yup';
export interface AuthFormData extends LoginFormData {
  name: string;
}
export interface LoginFormData {
  email: string;
  name?: string;
  password: string;
}

export function defaultData(): AuthFormData {
  return {
    email: '',
    password: '',
    name: '',
  };
}
export const loginSchema: yup.ObjectSchema<LoginFormData> = yup.object({
  email: yup.string().required(),
  password: yup.string().required().min(8).max(72),
  name: yup.string(),
});
export const signupSchema: yup.ObjectSchema<AuthFormData> = loginSchema.shape({
  name: yup.string().required(),
});
