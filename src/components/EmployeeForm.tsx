"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Employee, EmployeeFormData, Department } from "@/types/employee";
import { departmentService, employeeService } from "@/services/service";

interface EmployeeFormProps {
  open: boolean;
  onClose: () => void;
  reload: () => void;
  editingEmployee: Employee | null;
}

export default function EmployeeForm({
  open,
  onClose,
  reload,
  editingEmployee,
}: EmployeeFormProps) {
  const { control, register, handleSubmit, reset } = useForm<EmployeeFormData>({
    defaultValues: { code: "", name: "", age: 0, salary: 0, departmentId: undefined },
  });

  const [departments, setDepartments] = useState<Department[]>([]);
  const [loadingDepartments, setLoadingDepartments] = useState(true);

  // Load departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await departmentService.getAll();
        setDepartments(data);
      } catch (e) {
        console.error("❌ Lỗi load departments:", e);
      } finally {
        setLoadingDepartments(false);
      }
    };
    fetchDepartments();
  }, []);

  // Reset form khi editingEmployee hoặc departments thay đổi
  useEffect(() => {
    if (!loadingDepartments) {
      if (editingEmployee) {
        reset({
          code: editingEmployee.code ?? "",
          name: editingEmployee.name ?? "",
          age: editingEmployee.age ?? 0,
          salary: editingEmployee.salary ?? 0,
          departmentId: editingEmployee.departmentId ?? undefined,
        });
      } else {
        reset({ code: "", name: "", age: 0, salary: 0, departmentId: undefined });
      }
    }
  }, [editingEmployee, loadingDepartments, reset]);

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      if (editingEmployee) {
        await employeeService.update(editingEmployee.id, data);
      } else {
        await employeeService.create(data);
      }
      reload();
      onClose();
    } catch (e) {
      console.error("❌ Lỗi submit:", e);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editingEmployee ? "Update Employee" : "Add Employee"}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Employee Code"
          {...register("code", { required: true })}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Name"
          {...register("name", { required: true })}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Age"
          type="number"
          {...register("age", { required: true, valueAsNumber: true })}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Salary"
          type="number"
          {...register("salary", { required: true, valueAsNumber: true })}
        />

        {/* Department Select sử dụng Controller */}
        <Controller
          name="departmentId"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              select
              fullWidth
              margin="dense"
              label="Department"
              {...field}
              value={field.value ?? ""}
              onChange={(e) => field.onChange(Number(e.target.value))}
              disabled={loadingDepartments}
            >
              {departments.map((dept) => (
                <MenuItem key={dept.id} value={dept.id}>
                  {dept.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          {editingEmployee ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
