export function array_to_dict<T, K extends keyof T & PropertyKey>(iterable: T[], key: K = 'id' as K): Record<T[K] & PropertyKey, T> {
  return Object.assign({}, ...iterable.map((o) => ({ [o[key] as T[K] & PropertyKey]: o })));
}

export function deep_copy_stringify<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}
