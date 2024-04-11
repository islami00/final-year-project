type UnknownFn = (value: unknown) => unknown;
type UnknownPromiseFn = (value: unknown) => Promise<unknown>;

/**
 * Like passThrough, but guaranteed never to return
 * Inspired by: https://www.npmjs.com/package/promise-passthrough
 */
export function forwardError(...fns: UnknownFn[]) {
  return function (arg: unknown): never {
    fns.forEach((fn) => fn(arg));

    // Invoke fn and rethrow error
    throw arg;
  };
}

/**
 * Like passThrough, but guaranteed never to return
 * Inspired by: https://www.npmjs.com/package/promise-passthrough
 */
export function forwardErrorAndAwait(...fns: UnknownPromiseFn[]) {
  return async function (arg: unknown): Promise<never> {
    for (const fn of fns) {
      await fn(arg);
    }

    // Invoke fn and rethrow error
    throw arg;
  };
}
