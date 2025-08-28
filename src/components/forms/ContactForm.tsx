import { Box, Container, Stack } from "@mui/material";
import React, { useState } from "react";
import InputField from "../common/InputField";
import ButtonPrimary from "../common/ButtonPrimary";
import { validateFormContact } from "@/utils/validation/contactValidator";

interface ContactFormProps {
  onSubmit?: (data: { fullname: string; phone: string; reason: string }) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [form, setForm] = useState({ fullname: "", phone: "", reason: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = () => {
    const newErrors = validateFormContact(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit?.(form);
    setForm({ fullname: "", phone: "", reason: "" });
  };

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="sm">
        <Stack spacing={3}>
          <InputField
            label="Họ và tên"
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
            type="text"
            error={!!errors.fullname}
            helperText={errors.fullname}
          />

          <InputField
            label="Số điện thoại"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            type="tel"
            error={!!errors.phone}
            helperText={errors.phone}
          />

          <InputField
            label="Nội dung"
            name="reason"
            value={form.reason}
            onChange={handleChange}
            type="text"
            multiline
            rows={4}
            error={!!errors.reason}
            helperText={errors.reason}
          />

          <ButtonPrimary onClick={handleSubmit} fullWidth>
            Gửi yêu cầu
          </ButtonPrimary>
        </Stack>
      </Container>
    </Box>
  );
};

export default ContactForm;
