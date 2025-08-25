import { Box, Container, Stack, TextField } from "@mui/material";
import React from "react";
import ButtonPrimary from "../common/ButtonPrimary";

interface ContactFormProps {
  onSubmit?: (data: { name: string; phone: string; content: string }) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [content, setContent] = React.useState("");

  const handleSubmit = () => {
    onSubmit?.({ name, phone, content });
    setName(""); setPhone(""); setContent("");
  };

  return (
    <Box sx={{ py: { xs: 10, md: 16 } }}>
      <Container maxWidth="sm">
        <Stack spacing={3}>
          <TextField label="Họ và tên" fullWidth variant="outlined" value={name} onChange={e => setName(e.target.value)} />
          <TextField label="Số điện thoại" fullWidth variant="outlined" value={phone} onChange={e => setPhone(e.target.value)} />
          <TextField label="Nội dung" fullWidth multiline rows={4} variant="outlined" value={content} onChange={e => setContent(e.target.value)} />
          <ButtonPrimary onClick={handleSubmit}>Gửi yêu cầu</ButtonPrimary>
        </Stack>
      </Container>
    </Box>
  );
};

export default ContactForm;
