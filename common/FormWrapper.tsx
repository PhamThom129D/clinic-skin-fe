// src/components/common/FormWrapper.tsx
import React from "react";
import { Card, CardContent } from "@mui/material";

interface FormWrapperProps {
  children: React.ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children }) => {
  return (
    <Card className="max-w-2xl w-full shadow-xl rounded-2xl p-4">
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default FormWrapper;
