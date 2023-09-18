import * as Yup from "yup";
export const DevicesValidationSchema = Yup.object().shape({
  identifier: Yup.string().min(5).max(30).required(),
  inUse: Yup.boolean(),
  location: Yup.string(),
  system: Yup.string().required(),
});

export const DriversValidationSchema = Yup.object().shape({
  city: Yup.string().min(5).max(30).required(),
  name: Yup.string().min(5).max(30).required(),
  phone: Yup.string()
    .matches(/^0[1-9]\d{8}$/gm, "Invalid phone number")
    .required(),
  car: Yup.string().max(30),
  plate: Yup.string().max(30),
  email: Yup.string().min(5).max(50).required(),
  address: Yup.string().max(50),
});
