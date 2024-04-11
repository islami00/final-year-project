export function mapDefined<T, U>(
  array: T[],
  mapper: (value: T) => U | undefined
): U[] {
  const result: U[] = [];
  for (const item of array) {
    const mapped = mapper(item);
    if (mapped !== undefined) {
      result.push(mapped);
    }
  }
  return result;
}
