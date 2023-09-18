export const findNestedFieldValue = (
  obj: Record<string, string | Record<string, string | number | boolean>>,
  fieldName: string,
  nestingKey?: string,
): string | boolean | undefined => {
  if (!obj) return;
  if (obj.hasOwnProperty(fieldName) && !nestingKey) {
    return obj[fieldName] as string | boolean;
  }
  for (const prop in obj) {
    if (
      obj.hasOwnProperty(prop) &&
      typeof obj[prop] === 'object' &&
      nestingKey
    ) {
      const value = findNestedFieldValue(
        obj[nestingKey] as Record<
          string,
          string | Record<string, string | number | boolean>
        >,
        fieldName,
      );
      if (value !== undefined) {
        return value;
      }
    }
  }
  return undefined;
};
