import type { ListResult } from 'pocketbase';

export default abstract class Converter<From, To> {
  abstract fromApi(from: From): Promise<To>;

  async fromArrayApi(from: From[]): Promise<To[]> {
    const result = from.map((each) => this.fromApi(each));
    const resolved = await Promise.all(result);
    return resolved;
  }

  async fromListResult(from: ListResult<From>): Promise<ListResult<To>> {
    const result = await this.fromArrayApi(from.items);
    return {
      ...from,
      items: result,
    };
  }
}
