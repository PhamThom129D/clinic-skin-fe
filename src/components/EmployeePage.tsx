"use client";

import React, { useEffect, useState } from "react";
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Button, IconButton
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import { Employee } from "@/types/employee";
import EmployeeForm from "./EmployeeForm";
import ConfirmDialog from "./ConfirmDialog";

export default function EmployeePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ open: boolean; id: number | null }>({
    open: false,
    id: null,
  });

  const loadEmployees = async () => {
    const res = await axios.get<Employee[]>("/api/employees"); // Backend Spring
    setEmployees(res.data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleAdd = () => {
    setEditingEmployee(null);
    setOpenForm(true);
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setOpenForm(true);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`/api/employees/${id}`);
    loadEmployees();
    setConfirmDelete({ open: false, id: null });
  };

  return (
    <div>
      <Button variant="contained" onClick={handleAdd} sx={{ mb: 2 }}>
        Add Employee
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Department</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.age}</TableCell>
              <TableCell>{emp.salary}</TableCell>
              <TableCell>{emp.department?.name}</TableCell>
              <TableCell align="center">
                <IconButton onClick={() => handleEdit(emp)}>
                  <Edit color="primary" />
                </IconButton>
                <IconButton onClick={() => setConfirmDelete({ open: true, id: emp.id })}>
                  <Delete color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <EmployeeForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        reload={loadEmployees}
        editingEmployee={editingEmployee}
      />

      <ConfirmDialog
        open={confirmDelete.open}
        title="Xác nhận xóa"
        message="Bạn có chắc chắn muốn xóa nhân viên này không?"
        onCancel={() => setConfirmDelete({ open: false, id: null })}
        onConfirm={() => confirmDelete.id && handleDelete(confirmDelete.id)}
      />
    </div>
  );
}
