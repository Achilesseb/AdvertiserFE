import React from "react";
import Input from "../Input";
import Select, { SelectProps } from "../Select";
import { FormFieldsTemplate } from "../Devices/devicesAnnexes/manageDeviceTemplate";

export type FormikControlProps = {
  control: "input" | "select";
} & Omit<FormFieldsTemplate, "defaultValue"> &
  SelectProps;

function FormikControl(props: FormikControlProps) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "select":
      return <Select {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
