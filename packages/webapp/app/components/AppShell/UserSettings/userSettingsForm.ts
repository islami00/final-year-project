import { User } from '../../../models/User.model';
import { ZodOf } from '../../../models/types';
import { z } from 'zod';

enum UserSettingsFormIntent {
  DEFAULT = 'userSettingsForm/default',
}
export interface UserSettingsFormData {
  dashboardOrganisation: string | null;
  intent: UserSettingsFormIntent;
  userId: string;
}

interface DefaultDataArgs {
  user: User;
}
export function defaultData(args: DefaultDataArgs): UserSettingsFormData {
  const { user } = args;
  return {
    intent: UserSettingsFormIntent.DEFAULT,
    dashboardOrganisation: user.dashboardOrganisation,
    userId: user.id,
  };
}
export const schema = z.object({
  dashboardOrganisation: z.string().nullable(),
  intent: z.nativeEnum(UserSettingsFormIntent),
  userId: z.string().min(1),
}) satisfies ZodOf<UserSettingsFormData>;
