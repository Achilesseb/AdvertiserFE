import { setFormDefaultValues } from "@/utils/formUtils/formUtilis";
import { handleEWFormSubmit } from "@/utils/formUtils/handleSubmit";
import { mergeStyles } from "@/utils/mergeStyles";
import { updateFormCache } from "@/utils/formUtils/updateCache";
import { useQuery, useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useState, useCallback } from "react";
import { FieldValues, Resolver, useForm } from "react-hook-form";
import { DataWithIndex, FormMainPropTypes } from "./form";
import { FormBasicButtons } from "./formAnnexes/DefaultButtons";
import { FormHeader } from "./formAnnexes/FormHeader";
import { EWFormTitle } from "./formAnnexes/Title";
import { FormInputs } from "./formInputs/AllFormInputs";
import { useRouter } from "next/navigation";

dayjs.extend(utc);

const Form = <DataType extends {}, U extends FieldValues>({
  headlessForm,
  queryExpression,
  skipQuery = false,
  mutationExpression,
  entityID,
  entityVariable,
  defaultMutationVariables,
  validationSchema,
  redirectRoute,
  formTemplate,
  formSuccessObserver,
  formSuccessAction,
  formTitle,
  sectionTitle,
  sectionTitleKey,
  handleCancelButton,
  i18nPath,
  i18nFormObjectPath,
  generateCustomSectionButtons,
  generateCustomFormButtons,
  formStylesModifier,
  customFormControl,
  customFormErrors,
  customFormData,
  customMappingFunc,
  showSnackBar,
  customGetterMappingFunc,
  customFormSubmit,
  fetchPolicy,
}: FormMainPropTypes<U>): React.ReactElement | null => {
  const router = useRouter();

  const {
    containerStyles = "",
    formTitleStyles = "flex items-center w-4/12 justify-between mt-10 mb-6",
    formContainerStyles = "w-4/12",
    formInputsContainerStyles = "",
    formButtonContainerStyles = "flex w-full mt-10 mb-10",
  } = formStylesModifier || {};

  const [queryKey, setQueryKey] = useState<string>("");

  const {
    data,
    loading,
    error: getQueryError,
  } = useQuery<DataType>(queryExpression, {
    fetchPolicy: fetchPolicy ?? "cache-and-network",
    skip: skipQuery,
    variables: {
      ...(entityID && entityVariable && { [entityVariable]: entityID }),
    },
    onCompleted: (data) => {
      const queryKey = Object.keys(data)[0];
      setQueryKey(queryKey);

      return data;
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, touchedFields },
    setValue,
    reset,
    trigger,
    getValues,
    watch,
  } = useForm<U>({
    resolver: yupResolver(validationSchema) as unknown as Resolver<U, any>,
    mode: "onSubmit",
    values: setFormDefaultValues<DataType, U>(
      formTemplate,
      (customFormData ??
        customGetterMappingFunc?.(data as DataWithIndex) ??
        (data as DataWithIndex)?.[queryKey]) as DataType
    ),
  });

  const [handleEntityMutation] = useMutation(mutationExpression, {
    errorPolicy: "all",
    update: (cache, { data }) =>
      updateFormCache<DataType>({
        data,
        cache,
        queryKey,
        queryExpression,
        entityID,
        entityVariable,
      }),
    onError: (err) => {
      return err;
    },
  });

  const handleFormSubmit = (data: U) => {
    if (customFormSubmit)
      return customFormSubmit?.(data, reset, handleEntityMutation);

    return handleEWFormSubmit<DataType, U>({
      data,
      formTemplate,
      customMappingFunc,
      entityID,
      entityVariable,
      editEntityTemplateMutation: handleEntityMutation,
      defaultMutationVariables,
      redirectRoute,
      formSuccessObserver,
      formSuccessAction,
      showSnackBar,
      router,
    });
  };

  const generateFormButtons = useCallback(() => {
    if (generateCustomFormButtons) return generateCustomFormButtons();
    return (
      <FormBasicButtons
        handleCancelButton={handleCancelButton}
        isDirty={isDirty}
      />
    );
  }, [handleCancelButton, isDirty, generateCustomFormButtons]);

  const generateSectionTitle = useCallback(() => {
    if (!sectionTitle) return null;
    return (
      <FormHeader<DataType>
        queryKey={queryKey}
        sectionTitle={sectionTitle}
        sectionTitleDataKey={sectionTitleKey}
        data={data ?? (customFormData as DataType)}
      />
    );
  }, [data, sectionTitleKey, queryKey, sectionTitle, customFormData]);

  if (getQueryError) {
    return <div className="w-full px-20">{`${formTitle} not found`}</div>;
  }

  if (loading) return null;

  return (
    <div className={mergeStyles("w-full h-full px-20 ", containerStyles)}>
      {generateSectionTitle()}
      <EWFormTitle
        generateCustomSectionButtons={generateCustomSectionButtons}
        {...{ i18nFormObjectPath, i18nPath, formTitleStyles, formTitle }}
      />
      {headlessForm ? (
        <div className={` ${formContainerStyles}`}>
          <div className={formInputsContainerStyles}>
            <FormInputs<DataType, U>
              formTemplate={formTemplate}
              control={customFormControl ?? control}
              errors={customFormErrors ?? errors}
              data={
                (customFormData ??
                  (data as DataWithIndex)?.[queryKey]) as DataType
              }
              setValue={setValue}
              formTrigger={trigger}
              getValues={getValues}
              watch={watch}
              touchedFields={touchedFields as unknown as U}
            />
          </div>
          <div className={` ${formButtonContainerStyles}`}>
            {generateFormButtons()}
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className={formContainerStyles}
        >
          <div className={formInputsContainerStyles}>
            <FormInputs<DataType, U>
              formTemplate={formTemplate}
              control={customFormControl ?? control}
              errors={customFormErrors ?? errors}
              data={
                (customFormData ??
                  (data as DataWithIndex)?.[queryKey]) as DataType
              }
              setValue={setValue}
              formTrigger={trigger}
              getValues={getValues}
              watch={watch}
              touchedFields={touchedFields as unknown as U}
            />
          </div>
          <div className={`${formButtonContainerStyles}`}>
            {generateFormButtons()}
          </div>
        </form>
      )}
    </div>
  );
};

export default Form;
