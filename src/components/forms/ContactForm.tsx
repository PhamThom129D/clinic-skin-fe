import { Box, Container, Stack, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import InputField from "../../../common/InputField";
import ButtonPrimary from "../../../common/ButtonPrimary";
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
    <Box>
      <Container maxWidth="sm">
        <Paper
          elevation={4}
          sx={{
            borderRadius: 4,
            p: { xs: 3, md: 5 },
            background: "#ffffff",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            variant="h6"
            textAlign="center"
            fontWeight="bold"
            sx={{
              mb: 4,
              background: "linear-gradient(90deg, #158437, #52b788)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Điền thông tin liên hệ
          </Typography>

          <Stack spacing={3}>
            <InputField
              label="Họ và tên"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              type="text"
              error={!!errors.fullname}
              helperText={errors.fullname}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "&.Mui-focused fieldset": {
                    borderColor: "#158437",
                    boxShadow: "0 0 0 2px rgba(21,132,55,0.2)",
                  },
                },
              }}
            />

            <InputField
              label="Số điện thoại"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="tel"
              error={!!errors.phone}
              helperText={errors.phone}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "&.Mui-focused fieldset": {
                    borderColor: "#158437",
                    boxShadow: "0 0 0 2px rgba(21,132,55,0.2)",
                  },
                },
              }}
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "&.Mui-focused fieldset": {
                    borderColor: "#158437",
                    boxShadow: "0 0 0 2px rgba(21,132,55,0.2)",
                  },
                },
              }}
            />

            <ButtonPrimary
              onClick={handleSubmit}
              fullWidth
              sx={{
                mt: 2,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "12px",
                background: "linear-gradient(90deg, #158437, #52b788)",
                "&:hover": {
                  background: "linear-gradient(90deg, #136c2f, #3fa16a)",
                  boxShadow: "0 6px 16px rgba(21,132,55,0.3)",
                },
              }}
            >
              Gửi yêu cầu
            </ButtonPrimary>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default ContactForm;
