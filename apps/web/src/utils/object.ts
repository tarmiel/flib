// Special handling for arrays
type DeepRemoveNullUndefinedArray<T> = T extends (infer U)[]
  ? DeepRemoveNullUndefined<U>[]
  : T extends readonly (infer U)[]
    ? readonly DeepRemoveNullUndefined<U>[]
    : DeepRemoveNullUndefined<T>;

// Combined solution
type DeepRemoveNullUndefined<T> = T extends null | undefined
  ? never
  : T extends object
    ? {
        [K in keyof T]: DeepRemoveNullUndefinedArray<Exclude<T[K], null | undefined>>;
      }
    : T;

export function deepRemoveNullUndefined<T>(obj: T): DeepRemoveNullUndefined<T> {
  // Handle primitives and null/undefined
  if (obj === null || obj === undefined) {
    return undefined as any;
  }

  // Preserve non-object values (including functions)
  if (typeof obj !== 'object') {
    return obj as any;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj
      .map((item) => deepRemoveNullUndefined(item))
      .filter((item) => item !== undefined) as any;
  }

  // Handle Date and other special objects
  if (obj instanceof Date || obj instanceof RegExp || obj instanceof Map || obj instanceof Set) {
    return obj as any;
  }

  // Process regular objects
  const result: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = deepRemoveNullUndefined(obj[key]);
      if (value !== undefined) {
        result[key] = value;
      }
    }
  }
  return result;
}
