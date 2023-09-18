import { generateFormData } from "./formUtilis";
import { MutationFunction } from "@apollo/client";
import { Dispatch, SetStateAction } from "react";
import { FieldValues } from "react-hook-form";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { FormTemplateDefinition } from "@/Components/form/formTemplate";

type HandleSubmitPropTypes<U extends FieldValues> = {
  data: U;
  formTemplate: FormTemplateDefinition<U>;
  defaultMutationVariables?: Record<string, string | boolean>;
  redirectRoute?: string;
  formSuccessObserver?: string;
  formSuccessAction?: () => void;
  showSnackBar?: <T extends {}>(response: T) => void;
  customMappingFunc?: <U extends {}>(
    formTemplate: FormTemplateDefinition<U>,
    data: U
  ) => Record<string, unknown>;
  entityID?: string;
  entityVariable?: string;
  skipQuery?: boolean;
  editEntityTemplateMutation: MutationFunction;
  setUncaughtError?: Dispatch<SetStateAction<string>>;
  router: AppRouterInstance;
};

export const handleEWFormSubmit = async <T extends {}, U extends FieldValues>({
  data,
  formTemplate,
  customMappingFunc,
  entityID,
  entityVariable,
  editEntityTemplateMutation,
  defaultMutationVariables,
  redirectRoute,
  formSuccessObserver,
  formSuccessAction,
  setUncaughtError,
  showSnackBar,
  router,
}: HandleSubmitPropTypes<U>) => {
  const formData =
    customMappingFunc?.(formTemplate, data) ??
    generateFormData<U>(formTemplate, data);
  console.log(formData, defaultMutationVariables);
  try {
    const response = await editEntityTemplateMutation({
      variables: {
        input: {
          ...formData,
          ...(entityID && entityVariable && { [entityVariable]: entityID }),
          ...(defaultMutationVariables && defaultMutationVariables),
        },
      },
    });
    const mutationKey = Object.keys(response.data);
    if (response.errors) return;
    showSnackBar?.<T>(response?.data?.[mutationKey[0]]);

    if (redirectRoute) {
      await router.push(
        `${redirectRoute}?action=true&${entityID ? "type=update" : "type=add"}`
      );
    }

    if (formSuccessAction) {
      formSuccessAction();
    }
  } catch (err) {
    setUncaughtError?.(err as string);
    return;
  }
};
