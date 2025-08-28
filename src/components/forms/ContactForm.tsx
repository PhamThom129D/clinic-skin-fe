// src/components/common/ContactForm.tsx
import { Box, Container, Stack, Button } from "@mui/material";
import React, { useState } from "react";

import { required, nameRule, phoneRule } from "@/utils/validators";
import InputField from "../common/InputField";

interface ContactFormProps {
  onSubmit?: (data: { fullname: string; phone: string; reason: string }) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [form, setForm] = useState({ fullname: "", phone: "", reason: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" })); // reset lỗi khi sửa
  };

  const validateField = (name: string, value: string) => {
    let error = "";

    if (name === "fullname") {
      if (!value.trim()) error = required().required;
      else if (!nameRule.pattern.value.test(value)) error = nameRule.pattern.message;
    }

    if (name === "phone") {
      if (!value.trim()) error = required().required;
      else if (!phoneRule.pattern.value.test(value)) error = phoneRule.pattern.message;
    }

    if (name === "reason" && !value.trim()) {
      error = required().required;
    }

    return error;
  };

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};
    Object.keys(form).forEach(key => {
      const err = validateField(key, form[key as keyof typeof form]);
      if (err) newErrors[key] = err;
    });

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
          <Button variant="contained" size="large" onClick={handleSubmit}>
            Gửi yêu cầu
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default ContactForm;
