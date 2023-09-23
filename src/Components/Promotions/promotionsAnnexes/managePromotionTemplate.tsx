import { FormTemplateDefinition } from "@/Components/form/formTemplate";

export type FormFieldsTemplate = {
  name: string;
  label: string;
  defaultValue: string | boolean | number;
  type: "input" | "checkbox" | "select";
};

export type PromotionsFormData = {
  title: string;
  description: string;
  url: string;
  duration: number;
  category: string;
  fileName: string;
  file?: string;
};

export const promotionsNewFormTemplate: FormTemplateDefinition<PromotionsFormData> =
  {
    title: {
      fieldName: "title",
      label: "Promotion title",
      labelRequired: true,
      type: "input",
      containerClassName: "w-full relative z-30",
      constraints: {
        max: 200,
        min: 5,
      },
      errorTextClassName:
        "absolute text-error-40 left-0 bottom-0  text-labelSmall block text-right",
    },
    description: {
      fieldName: "description",
      label: "Promotion description",
      type: "input",
      inputClassName: "col-span-1",
      constraints: {
        max: 500,
        min: 15,
      },
    },

    category: {
      fieldName: "category",
      label: "Category",
      type: "input",
      constraints: {
        max: 500,
        min: 15,
      },
    },
    url: {
      fieldName: "url",
      label: "Visiting page",
      type: "input",
      constraints: {
        max: 500,
        min: 15,
      },
    },
    duration: {
      fieldName: "duration",
      label: "Video length",
      type: "react-element",
      disabled: true,
    },
  };
