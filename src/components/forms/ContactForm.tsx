import { Box, Container, Stack, TextField } from "@mui/material";
import ButtonPrimary from "../common/ButtonPrimary";
import React from "react";

const ContactForm: React.FC = () => (
  <Box sx={{ py: 16 }} id="booking">
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Stack spacing={3}>
        <TextField label="Họ và tên" fullWidth variant="outlined" />
        <TextField label="Số điện thoại" fullWidth variant="outlined" />
        <TextField label="Nội dung" fullWidth multiline rows={4} variant="outlined" />
        <ButtonPrimary>Gửi yêu cầu</ButtonPrimary>
      </Stack>
    </Container>
  </Box>
);

export default ContactForm;
