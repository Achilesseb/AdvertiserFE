import React from "react";
import { Field, ErrorMessage } from "formik";
import { FormFieldsTemplate } from "./Devices/devicesAnnexes/manageDeviceTemplate";

export type SelectProps = {
  options?: [
    {
      value: string;
      key: string;
    }
  ];
};

const Select = (
  props: Omit<FormFieldsTemplate, "defaultValue"> & SelectProps
) => {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field as="select" id={name} name={name} {...rest}>
        {options?.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name}>
        {(error: string) => <div className="error">{error}</div>}
      </ErrorMessage>
    </div>
  );
};

export default Select;
