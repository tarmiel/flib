export type ValueOf<T extends Record<string, unknown>> = T[keyof T];

export type SnakeCase<S extends string> = S extends `${infer C}${infer T}`
  ? `${C extends Uppercase<C> ? '_' : ''}${Lowercase<C>}${SnakeCase<T>}`
  : S;

export type SnakeizeKeys<T> =
  T extends Array<infer U>
    ? Array<SnakeizeKeys<U>>
    : T extends object
      ? {
          [K in keyof T as SnakeCase<string & K>]: SnakeizeKeys<T[K]>;
        }
      : T;

export type CamelCase<S extends string> = S extends `${infer P}_${infer Q}`
  ? `${P}${Capitalize<CamelCase<Q>>}`
  : S;

export type CamelizeKeys<T> =
  T extends Array<infer U>
    ? Array<CamelizeKeys<U>>
    : T extends object
      ? {
          [K in keyof T as CamelCase<string & K>]: CamelizeKeys<T[K]>;
        }
      : T;
