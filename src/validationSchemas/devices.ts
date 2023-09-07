import * as Yup from "yup";
export const DevicesValidationSchema = Yup.object().shape({
  identifier: Yup.string().min(5).max(30).required(),
  inUse: Yup.boolean(),
  location: Yup.string(),
  system: Yup.string().required(),
  driverId: Yup.string().required(),
});
