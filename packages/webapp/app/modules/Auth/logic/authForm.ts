import * as yup from 'yup';
export interface AuthFormData {
  email: string;
  password: string;
  name: string;
}

export function defaultData(): AuthFormData {
  return {
    email: '',
    password: '',
    name: '',
  };
}
export const loginSchema: yup.ObjectSchema<AuthFormData> = yup.object({
  email: yup.string().required(),
  password: yup.string().required().min(8).max(72),
  name: yup.string().defined(),
});
export const signupSchema: yup.ObjectSchema<AuthFormData> = loginSchema.shape({
  name: yup.string().required(),
});
