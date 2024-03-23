import { pb } from '../../pocketbase/pocketbase.client';

export async function logout() {
  pb.authStore.clear();
}
