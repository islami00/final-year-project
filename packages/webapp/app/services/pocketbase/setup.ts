import PocketBase from 'pocketbase';


export const pb = new PocketBase(import.meta.env.VITE_API_URL); 

// export const currentUser = writable(pb.authStore.model);

// Todo: Look into realtime.
// pb.authStore.onChange((auth) => {
//   console.log('authStore changed', auth);
//   currentUser.set(pb.authStore.model);
// });
