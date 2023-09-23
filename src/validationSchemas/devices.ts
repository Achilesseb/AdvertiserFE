import * as Yup from "yup";

const videoFileExtensionRegExp = /\.(mp4|avi|mov|mkv)$/;

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

export const ClientsValidationSchema = Yup.object().shape({
  city: Yup.string().min(3).max(30),
  name: Yup.string().min(5).max(30).required(),
  phone: Yup.string()
    .matches(/^0[1-9]\d{8}$/gm, "Invalid phone number")
    .required(),
  contactEmail: Yup.string().min(5).max(50).required(),
  address: Yup.string().max(100),
  cui: Yup.string().max(10),
});

export const PromotionsValidationSchema = Yup.object().shape({
  title: Yup.string().min(5).max(30).required(),
  description: Yup.string().max(100),
  category: Yup.string().max(50),
  fileName: Yup.string()
    .max(100)
    .matches(
      videoFileExtensionRegExp,
      "File must have a valid video extension (e.g., .mp4, .avi, .mov)"
    ),
});

export const TeamsValidationSchema = Yup.object().shape({
  city: Yup.string().min(5).max(30).required(),
  teamName: Yup.string().min(5).max(30).required(),
});

export const ConstantsValidationSchema = Yup.object().shape({
  identifier: Yup.string().min(5).max(30).required(),
});
