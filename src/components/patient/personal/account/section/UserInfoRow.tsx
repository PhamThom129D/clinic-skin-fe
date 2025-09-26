import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/system";

const UserInfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

interface UserInfoRowProps {
  label: string;
  value: string;
  isLast?: boolean; // Tùy chọn để kiểm soát Divider
}

const UserInfoRow: React.FC<UserInfoRowProps> = ({ label, value, isLast }) => {
  return (
    <>
      <UserInfoItem>
        <Typography variant="body1" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body1" fontWeight="medium">
          {value || "Chưa cập nhật"}
        </Typography>
      </UserInfoItem>
      {!isLast && <Divider />}
    </>
  );
};

export default UserInfoRow;