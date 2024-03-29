import * as yup from 'yup';
export interface OnboardFormData {
  name: string;
  userId: string;
}
export const schema: yup.ObjectSchema<OnboardFormData> = yup.object({
  name: yup.string().required(),
  userId: yup.string().required(),
});
export const defaultData = (userId: string): OnboardFormData => {
  return {
    name: '',
    userId,
  };
};
