import { Box, Container, Stack, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import {
  required,
  nameRule,
  phoneRule,
} from "@/utils/validators";

interface ContactFormProps {
  onSubmit?: (data: { fullname: string; phone: string; reason: string }) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [form, setForm] = useState({ fullname: "", phone: "", reason: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" })); // reset lỗi
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
          <TextField
            label="Họ và tên"
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
            error={!!errors.fullname}
            helperText={errors.fullname}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Số điện thoại"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Nội dung"
            name="reason"
            value={form.reason}
            onChange={handleChange}
            error={!!errors.reason}
            helperText={errors.reason}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
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
