"use client";

import React from "react";
import { Button } from "@mui/material";

interface Props {
  text: string;
  fullWidth?: boolean;
}

const SubmitButton: React.FC<Props> = ({ text, fullWidth }) => (
  <Button
    type="submit"
    variant="contained"
    size="large"
    fullWidth={fullWidth}
    sx={{ py: 1.2 }}
  >
    {text}
  </Button>
);

export default SubmitButton;
