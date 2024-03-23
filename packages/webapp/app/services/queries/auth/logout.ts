import { pb } from '../../pocketbase/setup';

export async function logout() {
  pb.authStore.clear();
}
