import { pb } from '../../pocketbase/setup';

export async function logout(): Promise<void> {
  pb.authStore.clear();
}
