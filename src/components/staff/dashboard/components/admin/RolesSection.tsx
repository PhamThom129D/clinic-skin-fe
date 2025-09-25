// RolesSection.tsx
"use client";
import React from "react";
import { Card, Typography, FormGroup, FormControlLabel, Checkbox, Box } from "@mui/material";
import { Control, useWatch, UseFormRegister } from "react-hook-form";
import { RoleEnum, roleLabels } from "@/utils/enums";
import DoctorCertificates from "./DoctorCertificates";
import { FormInput } from "@/components/common/FormInput";

interface RolesSectionProps {
  control: Control<any>;
  register: UseFormRegister<any>;
}

const RolesSection: React.FC<RolesSectionProps> = ({ control, register }) => {
  const selectedRoles: RoleEnum[] = useWatch({ control, name: "roles", defaultValue: [] });
  const isDoctor = selectedRoles.includes(RoleEnum.DOCTOR);

  return (
    <Box>
      <Card variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Vai trò</Typography>
        <FormGroup row sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          {Object.values(RoleEnum).map((role) => (
            <FormControlLabel
              key={role}
              control={<Checkbox value={role} {...register("roles")} />}
              label={roleLabels[role]}
            />
          ))}
        </FormGroup>
      </Card>

      {isDoctor && (
        <Box mt={2}>
          <FormInput control={control} name="specialty" label="Chuyên khoa" />
          <FormInput control={control} name="level" label="Trình độ" />
          <DoctorCertificates control={control} />
        </Box>
      )}
    </Box>
  );
};

export default RolesSection;
