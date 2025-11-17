// PersonalInfoSection.tsx
"use client";
import React from "react";
import { Box, Typography, Divider, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller, Control } from "react-hook-form";
import { FormInput } from "../../../../../../common/FormInput";
import { GenderEnum, genderLabels, StatusEnum, statusLabels } from "@/utils/enums";

interface PersonalInfoSectionProps {
  control: Control<any>;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ control }) => {
  return (
    <Box flex={1}>
      <Typography variant="h6" gutterBottom>
        Thông tin cá nhân
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <FormInput control={control} name="address" label="Địa chỉ" />
      <FormInput control={control} name="dateOfBirth" label="Ngày sinh" type="date" />

      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Giới tính</InputLabel>
            <Select {...field} label="Giới tính">
              {Object.values(GenderEnum).map((g) => (
                <MenuItem key={g} value={g}>{genderLabels[g]}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Trạng thái</InputLabel>
            <Select {...field} label="Trạng thái">
              {Object.values(StatusEnum).map((s) => (
                <MenuItem key={s} value={s}>{statusLabels[s]}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </Box>
  );
};

export default PersonalInfoSection;
