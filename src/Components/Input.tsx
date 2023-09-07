"use client";
import { Field, ErrorMessage } from "formik";
import { FormFieldsTemplate } from "./Devices/devicesAnnexes/manageDeviceTemplate";
import { SelectProps } from "./Select";

const Input = (
  props: Omit<FormFieldsTemplate, "defaultValue"> & SelectProps
) => {
  const { label, name, ...rest } = props;

  return (
    <div className="flex flex-col">
      <label
        className="block mb-2 text-md font-medium text-gray-900 text-neutral-10"
        htmlFor={name}
      >
        {label}
      </label>
      <Field
        id={name}
        name={name}
        {...rest}
        className="outline-none w-74 h-12 border rounded-md p-3 focus:border-neutral-50 transition ease-in-out duration-200 text-bodyLarge font-normal"
      />
      <ErrorMessage name={name}>
        {(error: string) => (
          <div className="text-error-50 text-xs self-end">
            {error.replace(name, label)}
          </div>
        )}
      </ErrorMessage>
    </div>
  );
};

export default Input;
