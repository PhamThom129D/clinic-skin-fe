import { ContactPayload } from "@/types/contact";
import { required, fullNameRule, phoneNumberRule } from "@/utils/validation/validators";




export const validateFullName = (value: string) => {
  if (!value.trim()) return fullNameRule.required;
  if (value.length < (fullNameRule.minLength?.value || 2))
    return fullNameRule.minLength?.message || "";
  if (!fullNameRule.pattern.value.test(value))
    return fullNameRule.pattern.message;
  return "";
};

export const validatePhone = (value: string) => {
  if (!value.trim()) return phoneNumberRule.required;
  if (!phoneNumberRule.pattern.value.test(value))
    return phoneNumberRule.pattern.message;
  return "";
};

export const validateReason = (value: string) => {
  if (!value.trim()) return required().required;
  return "";
};

// dispatcher
export const validateField = (name: string, value: string) => {
  switch (name) {
    case "fullname":
      return validateFullName(value);
    case "phone":
      return validatePhone(value);
    case "reason":
      return validateReason(value);
    default:
      return "";
  }
};

// validate toàn form
export const validateFormContact = (form: ContactPayload) => {
  const newErrors: { [key: string]: string } = {};
  Object.keys(form).forEach((key) => {
    const err = validateField(key, form[key as keyof ContactPayload]);
    if (err) newErrors[key] = err;
  });
  return newErrors;
};
