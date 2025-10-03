import axios from "axios";
import { Employee, EmployeeFormData } from "@/types/employee";

const api = axios.create({
  baseURL: "/api", 
});

// ========== EMPLOYEE ==========
export const getEmployees = async (): Promise<Employee[]> => {
  const res = await api.get<Employee[]>("/employees");
  return res.data;
};

export const getEmployeeById = async (id: number): Promise<Employee> => {
  const res = await api.get<Employee>(`/employees/${id}`);
  return res.data;
};

export const createEmployee = async (data: EmployeeFormData) => {
  const res = await api.post("/employees", data);
  return res.data;
};

export const updateEmployee = async (id: number, data: EmployeeFormData) => {
  const res = await api.put(`/employees/${id}`, data);
  return res.data;
};

export const deleteEmployee = async (id: number) => {
  await api.delete(`/employees/${id}`);
};
