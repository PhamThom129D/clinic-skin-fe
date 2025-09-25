// AddAccountForm.tsx
"use client";

import React from "react";
import { Box, Paper } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import PersonalInfoSection from "../../../components/admin/PersonalInfoSection";
import AccountInfoSection from "../../../components/admin/AccountInfoSection";
import RolesSection from "../../../components/admin/RolesSection";
import AvatarUpload from "@/components/common/AvatarUpload";

interface AddAccountFormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

const AddAccountForm: React.FC<AddAccountFormProps> = ({ onSubmit, onCancel }) => {
  const { control, handleSubmit, watch, register } = useForm({
    defaultValues: { roles: [], certificates: [] },
  });

  const avatarFile = watch("avatarFile");
  const avatarPreview = avatarFile && avatarFile.length > 0 ? URL.createObjectURL(avatarFile[0]) : null;

  const handleFormSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("roles", JSON.stringify(data.roles));

    Object.keys(data).forEach((key) => {
      if (key === "avatarFile" && data[key]?.[0]) {
        formData.append(key, data[key][0]);
      } else if (key === "certificates") {
        formData.append("certificates", JSON.stringify(data.certificates));
      } else if (key !== "roles") {
        formData.append(key, data[key]);
      }
    });

    onSubmit(formData);
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3, maxWidth: 1300, mx: "auto" }} elevation={3}>
      <Box
  id="account-form"
  component="form"
  onSubmit={handleSubmit(handleFormSubmit)}
  display="flex"
  flexDirection="column"
  gap={4}
>
        {/* Avatar */}
        <Controller
          name="avatarFile"
          control={control}
          render={({ field }) => (
            <AvatarUpload
              preview={avatarPreview}
              onChange={(file) => field.onChange(file ? [file] : null)}
            />
          )}
        />

        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
          <PersonalInfoSection control={control} />
          <AccountInfoSection control={control} />
        </Box>
      </Box>
    </Paper>
  );
};

export default AddAccountForm;
