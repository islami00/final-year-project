import { z } from 'zod';

// Any is needed for this to work.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ZodOf<T> = z.ZodType<T, any, any>;

/** Wrap JSON fields like this for PocketBase to not normalise */
export interface WrappedPBJSONField<T> {
  data: T;
}
