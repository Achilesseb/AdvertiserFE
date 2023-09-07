"use client";
import React from "react";
import { Formik, FormikValues, Form, FormikHelpers } from "formik";
import { AnyObjectSchema } from "yup";
import { DocumentNode } from "graphql";
import { FormFieldsTemplate } from "../Devices/devicesAnnexes/manageDeviceTemplate";
import ADVButton from "../Buttons";
import { useMutation } from "@apollo/client";
import FormikControl from "./FormikControl";
import toast from "react-hot-toast";
import { Snackbar } from "../SnackBar";
import { useRouter } from "next/navigation";
import _ from "lodash";
import { updateFormCache } from "@/utils/cacheHandlers";

export const GenericForm = <FormInputsTypes extends {}, DataType extends {}>({
  template,
  validationSchema,
  mutationQuery,
  handleCancelFormSubmit,
  redirectRoute,
  externalData,
  isEditForm,
  mutationMappingFunc,
}: GenericFormPropTypes<FormInputsTypes, DataType>) => {
  const router = useRouter();

  let initialValues = {};
  const [handleEntityChange] = useMutation(mutationQuery, {
    update: (cache, data) =>
      updateFormCache(
        data as { data: DataWithIndex<DataType> },
        cache,
        externalData
      ),
  });

  template.forEach((field) => {
    if (!_.isEmpty(externalData)) {
      return (initialValues = {
        ...initialValues,
        [field.name]: externalData?.[field?.name as keyof DataType],
      });
    }
    if (!isEditForm)
      initialValues = { ...initialValues, [field.name]: field.defaultValue };
  });

  const handleSubmit = async (
    values: FormikValues,
    submitProps: FormikHelpers<{}>
  ) => {
    try {
      const formatedValues = mutationMappingFunc?.(values) ?? values;
      await handleEntityChange({
        variables: {
          input: {
            ...formatedValues,
          },
        },
      });

      router.push(`${redirectRoute}?action=true`);
    } catch (err) {
      return toast.custom(
        <Snackbar type="error" message="Something went wrong" />
      );
    } finally {
      submitProps.setSubmitting(false);
      submitProps.resetForm();
    }
  };

  return (
    <div className="w-full  py-10 font-[Roboto-medium] bg-neutral-95 rounded-lg shadow-md">
      <div className="w-3/5 m-10">
        <h1 className="px-20 py-0">Add your entities</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form className="px-20 font-[Inter-500] flex flex-col gap-2">
                {template.map((field) => (
                  <FormikControl
                    key={field.name}
                    control={field.type}
                    type={field.type}
                    label={field.label}
                    name={field.name}
                  />
                ))}
                <div className="flex justify-evenly mt-10">
                  <ADVButton
                    buttonType="submit"
                    buttonText="Save"
                    styleType="filled"
                    modifier="w-2/5"
                  />
                  <ADVButton
                    buttonText="Cancel"
                    buttonType="button"
                    styleType="outlined"
                    modifier="w-2/5"
                    onButtonClick={handleCancelFormSubmit}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default GenericForm;

export type DataWithIndex<DataType> = Record<string, DataType>;

type GenericFormPropTypes<FormInputsTypes, DataType> = {
  template: FormFieldsTemplate[];
  validationSchema: AnyObjectSchema;
  mutationQuery: DocumentNode;
  onSubmit?: (value: FormikValues) => void;
  handleCancelFormSubmit: () => void;
  redirectRoute: string;
  externalData?: DataType;
  isEditForm: boolean;
  mutationMappingFunc?: (values: FormikValues) => Record<string, unknown>;
};
