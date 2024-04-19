import { useNavigation, type Navigation } from '@remix-run/react';
import { specialFields } from '../../../utils/Form/specialFields';

export function useIsNavigatingTo(intent: string): Navigation | null {
  const navigation = useNavigation();
  if (navigation.state === 'idle') return navigation;
  if (navigation.formData?.get(specialFields.intent) !== intent) return null;

  return navigation;
}
