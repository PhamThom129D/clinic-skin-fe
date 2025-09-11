"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { styled } from '@mui/system';
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthResponse } from "@/types/auth";
import { notifySuccess, notifyWarning } from "@/utils/toast";
import AvatarUpload from "@/components/common/AvatarUpload";
import GenderSelect from "@/components/common/GenderSelect";
import { FormInput } from "../../../common/FormInput";
import ButtonPrimary from "../../../common/ButtonPrimary";
import {
  emailRule,
  fullNameRule,
  phoneNumberRule,
  addressRule,
  dateOfBirthRule,
  formatDateForInput,
} from "@/utils/validation/validators";
import { EmergencyContact } from "@/types/userinfo";

interface UserInfoUpdateFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | '';
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

interface UserInfoUpdateProps {
  account: AuthResponse | null;
  emergencyContact: EmergencyContact | null;
  onBackClick: () => void;
  onUpdateSuccess: (updatedAccount: AuthResponse, updatedEmergencyContact: EmergencyContact) => void;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  minHeight: "100%",
}));

const UserInfoUpdate: React.FC<UserInfoUpdateProps> = ({ account, emergencyContact, onBackClick, onUpdateSuccess }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfoUpdateFormData>({
    defaultValues: {
      fullName: account?.fullName || "",
      phoneNumber: account?.phoneNumber || "",
      email: account?.email || "",
      dateOfBirth: formatDateForInput(account?.dateOfBirth),
      address: account?.address || "",
      emergencyContactName: emergencyContact?.contact_name || "",
      emergencyContactPhone: emergencyContact?.contact_phone || "",
    }
  });

  useEffect(() => {
    if (account) {
      setGender((account.gender as UserInfoUpdateFormData["gender"]) ?? "");
      setAvatarPreview(account.avatarUrl ?? null);
    }
  }, [account]);
  
  const [gender, setGender] = useState<UserInfoUpdateFormData["gender"]>("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleAvatarChange = (file: File | null) => {
    setAvatarFile(file);
    setAvatarPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleUpdateSubmit: SubmitHandler<UserInfoUpdateFormData> = async (data) => {
    if (!account) {
      notifyWarning("Không tìm thấy thông tin người dùng.");
      return;
    }
    try {
      const updatedAccount: AuthResponse = {
        ...account,
        ...data,
        gender: gender,
        avatarUrl: avatarPreview || account?.avatarUrl,
      };

      const updatedEmergencyContact: EmergencyContact = {
        emergency_id: emergencyContact?.emergency_id || 0,
        patient_id: emergencyContact?.patient_id || 0,
        contact_name: data.emergencyContactName,
        contact_phone: data.emergencyContactPhone,
      };

      onUpdateSuccess(updatedAccount, updatedEmergencyContact);
      notifySuccess("Cập nhật thông tin thành công!");
    } catch (err: unknown) {
      notifyWarning("Cập nhật thông tin thất bại.");
    }
  };
  
  if (!account) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <Typography>Đang tải thông tin...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 1.5,
        bgcolor: "#f0f2f5",
      }}
    >
      <StyledPaper elevation={3}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Cập nhật thông tin cá nhân
        </Typography>
        <form onSubmit={handleSubmit(handleUpdateSubmit)}>
          <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
            <AvatarUpload preview={avatarPreview} onChange={handleAvatarChange} />
          </Box>
          <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={2}>
            <FormInput name="fullName" control={control} label="Họ và tên" rules={fullNameRule} />
            <FormInput name="address" control={control} label="Địa chỉ" rules={addressRule} />
            <FormInput name="email" control={control} label="Email" rules={emailRule} />
            <FormInput name="phoneNumber" control={control} label="Số điện thoại" rules={phoneNumberRule} />
            <FormInput name="dateOfBirth" control={control} label="Ngày sinh" type="date" rules={dateOfBirthRule} />
            <GenderSelect
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value as UserInfoUpdateFormData["gender"])}
              error={!!errors.gender}
              helperText={errors.gender?.message}
            />
          </Box>
          
          {/* Liên hệ khẩn cấp */}
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 4, mb: 2 }}>
            Liên hệ khẩn cấp
          </Typography>
          <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={2}>
            <FormInput name="emergencyContactName" control={control} label="Họ tên" rules={fullNameRule} />
            <FormInput name="emergencyContactPhone" control={control} label="Số điện thoại" rules={phoneNumberRule} />
          </Box>
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Button variant="outlined" color="primary" sx={{ flex: 1 }} onClick={onBackClick}>
              Quay lại
            </Button>
            <ButtonPrimary
              type="submit"
              sx={{
                flex: 1,
                py: 1.5,
                fontSize: "0.95rem",
                borderRadius: 3,
                background: "linear-gradient(135deg, #64ce82, #4caf50)",
                "&:hover": {
                  background: "linear-gradient(135deg, #4caf50, #388e3c)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(100, 206, 130, 0.3)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Cập nhật thông tin
            </ButtonPrimary>
          </Box>
        </form>
      </StyledPaper>
    </Box>
  );
};

export default UserInfoUpdate;