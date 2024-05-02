export type OptionalProperties<T> = {
  [K in keyof T]?: T[K];
};
