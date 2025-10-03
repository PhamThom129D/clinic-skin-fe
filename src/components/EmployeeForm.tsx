"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Employee, EmployeeFormData, Department } from "@/types/employee";

interface EmployeeFormProps {
  open: boolean;
  onClose: () => void;
  reload: () => void;
  editingEmployee: Employee | null;
}

export default function EmployeeForm({ open, onClose, reload, editingEmployee }: EmployeeFormProps) {
  const { register, handleSubmit, reset } = useForm<EmployeeFormData>({
    defaultValues: { name: "", age: 0, salary: 0, departmentId: "" },
  });
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    if (editingEmployee) {
      reset({
        name: editingEmployee.name,
        age: editingEmployee.age,
        salary: editingEmployee.salary,
        departmentId: editingEmployee.department?.id || "",
      });
    } else {
      reset({ name: "", age: 0, salary: 0, departmentId: "" });
    }
  }, [editingEmployee, reset]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const res = await axios.get<Department[]>("/api/departments");
      setDepartments(res.data);
    };
    fetchDepartments();
  }, []);

  const onSubmit = async (data: EmployeeFormData) => {
    if (editingEmployee) {
      await axios.put(`/api/employees/${editingEmployee.id}?departmentId=${data.departmentId}`, data);
    } else {
      await axios.post(`/api/employees?departmentId=${data.departmentId}`, data);
    }
    reload();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editingEmployee ? "Update Employee" : "Add Employee"}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth margin="dense" label="Name"
          {...register("name", { required: true })}
        />
        <TextField
          fullWidth margin="dense" label="Age" type="number"
          {...register("age", { required: true, valueAsNumber: true })}
        />
        <TextField
          fullWidth margin="dense" label="Salary" type="number"
          {...register("salary", { required: true, valueAsNumber: true })}
        />
        <TextField
          select fullWidth margin="dense" label="Department"
          defaultValue=""
          {...register("departmentId", { required: true, valueAsNumber: true })}
        >
          {departments.map((dept) => (
            <MenuItem key={dept.id} value={dept.id}>
              {dept.name}
            </MenuItem>
          ))}
        </TextField>
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
