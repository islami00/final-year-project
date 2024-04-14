export async function asyncCatch<T>(
  prom: Promise<T>
): Promise<[data: T, error: null] | [data: null, error: unknown]> {
  try {
    const data = await prom;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}
