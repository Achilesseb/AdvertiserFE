const foreignKeyRemapper = (
  errorParams: Record<string, string>,
): Record<string, string> => ({
  field: errorParams.key.replace('/id/gi', ''),
});

const uniqueViolationRemapper = (
  errorParams: Record<string, string>,
): Record<string, string> => {
  const field = errorParams.columns.split(',')[1] ?? errorParams.columns;
  const value = errorParams.values.split(',')[1] ?? errorParams.values;

  return {
    field,
    value,
  };
};

export const errorMap: Record<
  string,
  (arg1: Record<string, string>) => Record<string, string>
> = {
  'errors.foreignKeyViolation': foreignKeyRemapper,
  'errors.uniqueValueViolation': uniqueViolationRemapper,
};
