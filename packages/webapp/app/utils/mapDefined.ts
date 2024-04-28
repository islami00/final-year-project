export function mapDefined<T, U>(
  array: T[],
  mapper: (value: T, idx: number) => U | undefined
): U[] {
  const result: U[] = [];
  for (const [idx, item] of array.entries()) {
    const mapped = mapper(item, idx);
    if (mapped !== undefined) {
      result.push(mapped);
    }
  }
  return result;
}
