import { DataWithIndex } from "../form";
import { FormSectionPropTypes } from "./formAnnexes";

export const FormHeader = <DataType extends {}>({
  data,
  sectionTitle,
  sectionTitleDataKey,
  queryKey,
}: FormSectionPropTypes<DataType>) => {
  const sectionTitleDataValue = (data as DataWithIndex)?.[queryKey as string]?.[
    sectionTitleDataKey as string
  ] as string;

  const formSectionTitle = sectionTitleDataValue ?? sectionTitle;

  if (!formSectionTitle) return null;

  return (
    <h1 className="text-headlineSmall flex items-center font-bold pb-10 border-b-1 border-neutral-90">
      {formSectionTitle}
    </h1>
  );
};
