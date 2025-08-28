import { required } from '@/utils/validation/validators';
import {
  fullNameRule,
  emailRule,
  phoneNumberRule,
  passportRule,
  occupationRule,
  genderRule,
  dateOfBirthRule,
  appointmentDateRule,
  appointmentTimeRule,
  doctorIdRule,
  addressRule,
} from "./validators";
import { BookingData } from "@/types/booking";

type BookingErrors = Partial<Record<keyof BookingData, string>>;

export const validateField = (
  name: keyof BookingData,
  value: BookingData[keyof BookingData]
): string | undefined => {
  let error: string | undefined;

  switch (name) {
    case "fullName":
      if (!value) error = fullNameRule.required;
      else if (String(value).length < fullNameRule.minLength.value)
        error = fullNameRule.minLength.message;
      else if (!fullNameRule.pattern.value.test(String(value)))
        error = fullNameRule.pattern.message;
      break;

    case "email":
      if (!value) error = emailRule.required;
      else if (!emailRule.pattern.value.test(String(value)))
        error = emailRule.pattern.message;
      break;

    case "phoneNumber":
      if (!value) error = phoneNumberRule.required;
      else if (!phoneNumberRule.pattern.value.test(String(value)))
        error = phoneNumberRule.pattern.message;
      break;

    case "passportNumber":
      if (!value) error = passportRule.required;
      else if (!passportRule.pattern.value.test(String(value)))
        error = passportRule.pattern.message;
      break;

    case "occupation":
      if (!value) error = occupationRule.required;
      else if (!occupationRule.pattern.value.test(String(value)))
        error = occupationRule.pattern.message;
      break;

    case "address":
      if (!value) error = addressRule.required;
      else if (String(value).length < addressRule.minLength.value)
        error = addressRule.minLength.message;
      break;

    case "gender":
      if (!value) error = genderRule.required;
      break;

    case "dateOfBirth":
      if (!value) error = dateOfBirthRule.required;
      break;

    case "appointmentDate":
      if (!value) error = appointmentDateRule.required;
      break;

    case "appointmentTime":
      if (!value) error = appointmentTimeRule.required;
      else if (!appointmentTimeRule.pattern.value.test(String(value)))
        error = appointmentTimeRule.pattern.message;
      break;

    case "doctorId":
      if (!value) error = doctorIdRule.required;
      break;

    default:
      break;
  }

  return error;
};


export const validateFormBooking = (
  data: BookingData
): BookingErrors => {
  const errors: BookingErrors = {};

  (Object.keys(data) as (keyof BookingData)[]).forEach((key) => {
    const error = validateField(key, data[key]);
    if (error) errors[key] = error;
  });

  return errors;
};
