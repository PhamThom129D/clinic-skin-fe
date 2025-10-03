"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Employee } from "@/types/employee";
import EmployeeForm from "./EmployeeForm";
import ConfirmDialog from "./ConfirmDialog";
import { employeeService } from "@/services/service";

export default function EmployeePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{
    open: boolean;
    id: number | null;
  }>({
    open: false,
    id: null,
  });

  const loadEmployees = async () => {
    try {
      const data = await employeeService.getAll();
      setEmployees(data);
    } catch (e) {
      console.error("❌ Lỗi load employees:", e);
    }
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
    try {
      await employeeService.delete(id);
      await loadEmployees();
      setConfirmDelete({ open: false, id: null });
    } catch (e) {
      console.error("❌ Lỗi xóa:", e);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleAdd} sx={{ mb: 2 }}>
        ➕ Add Employee
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>EmployyeCode</b></TableCell>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Age</b></TableCell>
            <TableCell><b>Salary</b></TableCell>
            <TableCell><b>Department</b></TableCell>
            <TableCell align="center"><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.code}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.age}</TableCell>
                <TableCell>{emp.salary}</TableCell>
            <TableCell>{emp.departmentName ?? "N/A"}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleEdit(emp)}>
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton
                    onClick={() => setConfirmDelete({ open: true, id: emp.id })}
                  >
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                Không có nhân viên nào
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Form thêm/sửa nhân viên */}
      <EmployeeForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        reload={loadEmployees}
        editingEmployee={editingEmployee}
      />

      {/* Hộp thoại xác nhận xóa */}
      <ConfirmDialog
        open={confirmDelete.open}
        title="Xác nhận xóa"
        message="Bạn có chắc chắn muốn xóa nhân viên này không?"
        onCancel={() => setConfirmDelete({ open: false, id: null })}
        onConfirm={() =>
          confirmDelete.id !== null && handleDelete(confirmDelete.id)
        }
      />
    </div>
  );
}
