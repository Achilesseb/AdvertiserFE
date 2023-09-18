import { FormTemplateDefinitionInputType } from "@/Components/form/formTemplate";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { FieldValues } from "react-hook-form";
import { toCapitalised } from "./capitalise";

type Freq = { [key: string]: string };

dayjs.extend(utc);

export const formatDate = (date: string) => {
  const allFields = date.replace("RRULE:", "").split(";");
  const dividedFields: Freq = {};
  allFields.forEach(
    (field) => (dividedFields[`${field.split("=")[0]}`] = field.split("=")[1])
  );

  const freq =
    dividedFields.INTERVAL === "1"
      ? toCapitalised(dividedFields.FREQ)
      : dividedFields.INTERVAL === "2"
      ? "2 weeks"
      : "4 weeks";
  const days = dividedFields.BYDAY.split(",")
    .map((day) => toCapitalised(day))
    .join(", ");
  return [freq, days];
};

export const setDatePickerLimits = <T, U extends FieldValues>(
  data: T,
  input: FormTemplateDefinitionInputType<U>
) => {
  const receivedDate = formatFormDate(
    (data as Record<string, string>)?.[input.fieldName]
  );
  const defaultDate = formatFormDate(input?.defaultFieldValue as string);

  const min = receivedDate < defaultDate ? receivedDate : defaultDate;
  const max = receivedDate < defaultDate ? receivedDate : undefined;
  return { max, min };
};

export const formatFormDate = (date: string) =>
  dayjs.utc(date).format("YYYY-MM-DD");
