import {
  fullNameRule,
  emailRule,
  phoneNumberRule,
  passportRule,
  occupationRule,
  genderRule,
  dateOfBirthRule,
  doctorIdRule,
  addressRule,
  required,
  createBookingRules,
} from "./validators";
import { BookingData } from "@/types/booking";

// type cho rule
type ValidationRule<T> = {
  required?: string;
  minLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  validate?: (val: T, data?: BookingData) => true | string;
};

type BookingErrors = Partial<Record<keyof BookingData, string>>;

const { appointmentDateRule, appointmentTimeRule } = createBookingRules();

export const validateField = (
  name: keyof BookingData,
  value: BookingData[keyof BookingData],
  data?: BookingData
): string | undefined => {
  let error: string | undefined;

  const runValidate = <T>(
    rule: ValidationRule<T>,
    val: T
  ): string | undefined => {
    if (!val && rule.required) return rule.required;
    if (rule.minLength && String(val).length < rule.minLength.value) {
      return rule.minLength.message;
    }
    if (rule.pattern && !rule.pattern.value.test(String(val))) {
      return rule.pattern.message;
    }
    if (rule.validate) {
      const result = rule.validate(val, data);
      if (result !== true) {
        return typeof result === "string" ? result : "Giá trị không hợp lệ";
      }
    }
    return undefined;
  };

  switch (name) {
    case "fullName":
      error = runValidate(fullNameRule, value as string);
      break;
    case "email":
      error = runValidate(emailRule, value as string);
      break;
    case "phoneNumber":
      error = runValidate(phoneNumberRule, value as string);
      break;
    case "passportNumber":
      error = runValidate(passportRule, value as string);
      break;
    case "occupation":
      error = runValidate(occupationRule, value as string);
      break;
    case "address":
      error = runValidate(addressRule, value as string);
      break;
    case "gender":
      error = runValidate(genderRule, value as string);
      break;
    case "dateOfBirth":
      error = runValidate(dateOfBirthRule, value as string);
      break;
    case "appointmentDate":
      error = runValidate(appointmentDateRule, value as string);
      break;
    case "appointmentTime":
      error = runValidate(appointmentTimeRule, value as string);
      break;
    case "doctorId":
      error = runValidate(doctorIdRule, value as number);
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
    const error = validateField(key, data[key], data);
    if (error) errors[key] = error;
  });
  return errors;
};
