import { z } from 'zod';

// Any is needed for this to work.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ZodOf<O, I = any> = z.ZodType<O, any, I>;

/** Wrap JSON fields like this for PocketBase to not normalise */
export interface WrappedPBJSONField<T> {
  data: T;
}
