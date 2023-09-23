import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import { isEmpty } from "lodash";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  FieldValues,
  PathValue,
  Path,
  Controller,
  Control,
  FieldErrors,
  UseFormTrigger,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";
import { DropDownComponent, ValueReturnType } from "./DropDownComponent";

import { FormTemplateDefinition } from "./form/formTemplate";
import { InputError } from "./form/formAnnexes/Error";

export const SearchInputComponent = <
  DataType extends {},
  FormTypes extends FieldValues
>({
  formTrigger,
  errors,
  formTemplate,
  setValue,
  setSelectedEntityId,
  externalData,
  queryExpression,
  entityIdentifier,
  formFieldIdentifier,
  displayKey,
  filterFieldIdentifier,
  reset,
  setReset,
  ...props
}: SearchInputPropTypes<DataType, FormTypes>) => {
  const [inputDisplayValue, setInputDisplayValue] = useState<string>(
    (externalData?.[entityIdentifier as keyof DataType] as string) ?? ""
  );

  const [filteredEntities, setFilteredEntities] = useState<
    Array<{ id: string; data: DataType; disabled?: boolean }>
  >([]);

  useEffect(() => {
    if (!externalData) return;

    setInputDisplayValue(
      externalData?.[entityIdentifier as keyof DataType] as string
    );
    setValue?.(
      formFieldIdentifier as Path<FormTypes>,
      externalData?.[entityIdentifier as keyof DataType] as PathValue<
        FormTypes,
        Path<FormTypes>
      >
    );
    setFilteredEntities([
      {
        id: externalData?.["id" as keyof DataType] as string,
        data: externalData,
      },
    ]);
  }, [externalData, entityIdentifier, formFieldIdentifier, setValue]);

  const { refetch: refetchEntities } = useQuery(queryExpression, {
    fetchPolicy: "network-only",
    variables: {
      input: { filters: { [filterFieldIdentifier]: inputDisplayValue } },
    },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      const queryKey = Object.keys(data)[0];
      if (isEmpty(data?.[queryKey])) {
        return;
      }

      const entitiesDataHandler = data?.[queryKey].data.map(
        (result: DataType) => {
          return { id: result?.["id" as keyof DataType], data: result };
        }
      );
      setFilteredEntities(entitiesDataHandler);
    },
  });

  useEffect(() => {
    if (entityIdentifier === "") {
      setFilteredEntities([]);
    }

    if (entityIdentifier !== "") {
      refetchEntities();
    }
  }, [entityIdentifier, refetchEntities]);

  useEffect(() => {
    if (reset) {
      setFilteredEntities([]);
      setInputDisplayValue("");
    }

    setReset?.(false);
  }, [reset, setFilteredEntities, setReset, refetchEntities]);

  if (!props.control || !formTemplate) {
    return (
      <div className="w-full h-full  flex flex-col gap-1 mt-2">
        {props.label ? (
          <label className={`mr-auto ${props.labelClassName}`}>
            {props.label as string}
            {props.labelRequired ? (
              <span className="text-error-60"> *</span>
            ) : null}
          </label>
        ) : null}

        <DropDownComponent<DataType, FormTypes>
          displayKey={displayKey}
          debouncer={500}
          data={filteredEntities}
          displayValue={inputDisplayValue}
          onChangeInputValue={setInputDisplayValue}
          onSelectValue={(value: ValueReturnType) => {
            setSelectedEntityId?.(value?.id);
            setInputDisplayValue(value?.data?.[entityIdentifier] as string);
          }}
          className={`w-full ${props.containerClassName}`}
          formTrigger={formTrigger}
          {...props}
        />
      </div>
    );
  }
  return (
    <Controller
      key={props.fieldName as string}
      name={props.fieldName as unknown as Path<FormTypes>}
      control={props.control as Control<FormTypes>}
      render={() => (
        <div className="w-full h-full  flex flex-col gap-1 mt-2">
          {props.label ? (
            <label className={`mr-auto ${props.labelClassName}`}>
              {props.label as string}
              {props.labelRequired ? (
                <span className="text-error-60"> *</span>
              ) : null}
            </label>
          ) : null}

          <DropDownComponent<DataType, FormTypes>
            displayKey={displayKey}
            debouncer={500}
            data={filteredEntities}
            displayValue={inputDisplayValue}
            onChangeInputValue={setInputDisplayValue}
            onSelectValue={(value: ValueReturnType) => {
              setSelectedEntityId?.(value?.id);
              setValue?.(
                formFieldIdentifier as Path<FormTypes>,
                value?.id as PathValue<FormTypes, Path<FormTypes>>
              );
              setInputDisplayValue(value?.data?.[entityIdentifier] as string);
              formTrigger?.();
            }}
            className={`w-full ${props.containerClassName}`}
            formTrigger={formTrigger}
            {...props}
          />

          <InputError
            errors={errors as FieldErrors<FormTypes>}
            field={props.fieldName as string}
            formTemplate={formTemplate}
            errorTextModifierStyles={props?.errorTextClassName as string}
          />
        </div>
      )}
    />
  );
};

export type SearchInputPropTypes<DataType, FormTypes extends FieldValues> = {
  queryExpression: DocumentNode;
  entityIdentifier: string;
  formFieldIdentifier: string;
  filterFieldIdentifier: string;
  displayKey?: string;
  externalData?: DataType;
  setSelectedEntityId?: Dispatch<SetStateAction<string | null>>;
  formTrigger?: UseFormTrigger<FormTypes>;
  errors?: FieldErrors<FormTypes>;
  formTemplate?: FormTemplateDefinition<FormTypes>;
  setValue?: UseFormSetValue<FormTypes>;
  getValues?: UseFormGetValues<FormTypes>;
  reset?: boolean;
  setReset?: Dispatch<SetStateAction<boolean>>;
  [key: string]: unknown;
};
