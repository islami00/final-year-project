export type ClassNamesRecord<T extends PropertyKey = string> = Partial<
  Record<T, string>
>;
