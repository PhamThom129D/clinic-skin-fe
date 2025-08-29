import { Control, Controller, FieldValues, RegisterOptions, Path } from "react-hook-form";
import InputField from "./InputField";

interface FormInputProps<T extends FieldValues> {
  name: Path<T>; // bắt buộc phải dùng Path<T>
  control: Control<T>;
  label: string;
  type?: string;
  rules?: RegisterOptions<T, Path<T>>; // generic theo T
}

export function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  rules,
  
}: FormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <InputField
          {...field}
          label={label}
          type={type}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
}
