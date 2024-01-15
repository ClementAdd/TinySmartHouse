// Exclude a field from an object
export function exclude<ObjectType, Key extends keyof ObjectType>(
  obj: ObjectType | null,
  keys: string[],
): Omit<ObjectType, Key> | null {
  if (obj === null || typeof obj !== 'object') {
    return null;
  }
  const objAsRecord: Record<string, any> = obj as Record<string, any>;
  return Object.fromEntries(
    Object.entries(objAsRecord).filter(([key]) => !keys.includes(key as string)),
  ) as Omit<ObjectType, Key>;
}

