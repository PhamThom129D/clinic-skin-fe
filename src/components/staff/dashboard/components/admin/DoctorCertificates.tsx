"use client";

import React from "react";
import { Box, Typography, Divider, Card, IconButton, Button, Tooltip } from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { useFieldArray, Control, Controller } from "react-hook-form";
import { FormInput } from "../../../../../../common/FormInput";
import ButtonPrimary from "../../../../../../common/ButtonPrimary";

interface DoctorCertificatesProps {
  control: Control<any>;
}

const DoctorCertificates: React.FC<DoctorCertificatesProps> = ({ control }) => {
  const { fields, append, remove } = useFieldArray({ control, name: "certificates" });

  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Danh sách chứng chỉ
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {fields.map((field, index) => (
        <Box
          key={field.id}
          sx={{
            border: "1px solid #ccc",
            borderRadius: 2,
            p: 2,
            mb: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <FormInput control={control} name={`certificates.${index}.name`} label="Tên chứng chỉ" />
          <FormInput control={control} name={`certificates.${index}.certificateNumber`} label="Số chứng chỉ" />
          <FormInput control={control} name={`certificates.${index}.issuedDate`} label="Ngày cấp" type="date" />
          <FormInput control={control} name={`certificates.${index}.expiryDate`} label="Ngày hết hạn" type="date" />
          <FormInput control={control} name={`certificates.${index}.issuedBy`} label="Cơ quan cấp" />
          <FormInput control={control} name={`certificates.${index}.description`} label="Mô tả" type="text" />

          {/* Upload & preview multiple files */}
          <Controller
            name={`certificates.${index}.imageFiles`}
            control={control}
            render={({ field }) => {
              const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const newFiles = e.target.files ? Array.from(e.target.files) : [];
                field.onChange([...(field.value || []), ...newFiles]);
              };

              const removeFile = (i: number) => {
                const updated = [...(field.value || [])];
                updated.splice(i, 1);
                field.onChange(updated);
              };

              const removeAllFiles = () => {
                field.onChange([]);
              };

              return (
                <Box>
                  <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                    <Button variant="outlined" component="label">
                      Chọn ảnh
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        hidden
                        onChange={handleFilesChange}
                      />
                    </Button>
                    {(field.value || []).length > 0 && (
                      <Button variant="outlined" color="error" onClick={removeAllFiles}>
                        Xóa tất cả
                      </Button>
                    )}
                  </Box>

                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {(field.value || []).map((file: File, i: number) => (
                      <Tooltip key={i} title={file.name} arrow>
                        <Box
                          sx={{
                            position: "relative",
                            width: 250,
                            height: 200,
                            border: "1px solid #ccc",
                            borderRadius: 2,
                            mx:2
                          }}
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`preview-${i}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: 2,
                            }}
                          />
                          <IconButton
                            size="small"
                            sx={{
                              position: "absolute",
                              top: 2,
                              right: 2,
                              color: "red",
                            }}
                            onClick={() => removeFile(i)}
                          >
                            ×
                          </IconButton>
                        </Box>
                      </Tooltip>
                    ))}
                  </Box>
                </Box>
              );
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={() => remove(index)} color="error">
              <RemoveCircleOutline />
            </IconButton>
          </Box>
        </Box>
      ))}

      <ButtonPrimary
        startIcon={<AddCircleOutline />}
        onClick={() =>
          append({
            name: "",
            certificateNumber: "",
            issuedDate: "",
            expiryDate: "",
            issuedBy: "",
            description: "",
            imageFiles: [],
          })
        }
      >
        Thêm chứng chỉ
      </ButtonPrimary>
    </Card>
  );
};

export default DoctorCertificates;
