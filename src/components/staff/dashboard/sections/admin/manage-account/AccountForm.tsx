"use client";

import React, { useEffect } from "react";
import { Box, Paper } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import PersonalInfoSection from "../../../components/admin/PersonalInfoSection";
import AccountInfoSection from "../../../components/admin/AccountInfoSection";
import AvatarUpload from "../../../../../../../common/AvatarUpload";

interface AddAccountFormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

interface AddAccountFormValues {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  status: string;
  role: string;
  avatarFile: File[] | null;
}

const AddAccountForm: React.FC<AddAccountFormProps> = ({ onSubmit, onCancel }) => {
  const { control, handleSubmit, watch } = useForm<AddAccountFormValues>({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      password: "",
      address: "",
      dateOfBirth: "",
      gender: "",
      status: "",
      role: "ROLE_PATIENT",
      avatarFile: null,
    },
  });

  useEffect(() => {
    console.log("[AddAccountForm] mounted");
    return () => {
      console.log("[AddAccountForm] unmounted");
    };
  }, []);

  // Avatar preview
  const avatarFile = watch("avatarFile");
  const avatarPreview =
    avatarFile && avatarFile.length > 0 ? URL.createObjectURL(avatarFile[0]) : null;

  // Submit
  const handleFormSubmit = (data: AddAccountFormValues) => {
    try {
      console.log("[AddAccountForm] handleFormSubmit called with data:", data);

      const formData = new FormData();

      // Append tất cả field text
      formData.append("fullName", data.fullName || "");
      formData.append("phoneNumber", data.phoneNumber || "");
      formData.append("email", data.email || "");
      formData.append("password", data.password || "");
      formData.append("address", data.address || "");
      formData.append("dateOfBirth", data.dateOfBirth || "");
      formData.append("gender", data.gender || "");
      formData.append("status", data.status || "");
      formData.append("role", data.role || "ROLE_PATIENT");

      // Avatar
      if (data.avatarFile?.[0]) {
        formData.append("avatarFile", data.avatarFile[0]);
      }

      // Log entries in a friendly way (show file names)
      const entries = Array.from(formData.entries()).map(([k, v]) => [
        k,
        v instanceof File ? `File(${v.name}, ${v.size} bytes)` : v,
      ]);
      console.log("[AddAccountForm] created FormData entries:", entries);

      // Finally call parent's onSubmit
      console.log("[AddAccountForm] calling props.onSubmit(formData) ...");
      onSubmit(formData);
    } catch (err) {
      console.error("[AddAccountForm] error in handleFormSubmit:", err);
    }
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
              onChange={(file) => {
                console.log("[AddAccountForm] AvatarUpload.onChange file:", file);
                // convert to array to match expected type
                field.onChange(file ? [file] : null);
              }}
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
