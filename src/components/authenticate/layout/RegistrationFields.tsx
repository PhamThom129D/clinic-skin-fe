"use client";
import React, { ChangeEvent } from "react";
import { Grid } from "@mui/material";
import InputField from "../section/InputField";
import GenderSelect from "../section/GenderSelect";

interface Props {
  form: {
    fullName: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
  };
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const RegistrationFields: React.FC<Props> = ({ form, handleChange }) => (
  <Grid container spacing={2}>
    <Grid sx={{ width: "48%" }}>
      <InputField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="example@gmail.com"
      />
    </Grid>

    <Grid sx={{ width: "48%" }}>
      <InputField
        label="Họ và tên"
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
        placeholder="Nguyễn Văn A"
      />
    </Grid>

    <Grid sx={{ width: "48%" }}>
      <InputField
        label="Mật khẩu"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="••••••••"
      />
    </Grid>

    <Grid sx={{ width: "48%" }}>
      <InputField
        label="Số điện thoại"
        name="phoneNumber"
        value={form.phoneNumber}
        onChange={handleChange}
        placeholder="0912345678"
      />
    </Grid>
    
    <Grid sx={{ width: "48%" }}>
      <InputField
        label="Xác nhận mật khẩu"
        name="confirmPassword"
        type="password"
        value={form.confirmPassword}
        onChange={handleChange}
        placeholder="••••••••"
      />
    </Grid>

    <Grid sx={{ width: "48%" }}>
      <GenderSelect
        name="gender"
        value={form.gender}
        onChange={handleChange}
      />
    </Grid>
  </Grid>
);

export default RegistrationFields;