import { InputErrorPropTypes } from "./formAnnexes";
import { FieldValues } from "react-hook-form";

export const InputError = <U extends FieldValues>({
  errors,
  field,
  errorTextModifierStyles = "absolute text-error-40 left-0 text-labelSmall block text-right",
}: InputErrorPropTypes<U>) => {
  if (!errors?.[field]) {
    return null;
  }
  return (
    <p className={`${errorTextModifierStyles}`}>
      {errors?.[field]?.message as string}
    </p>
  );
};
