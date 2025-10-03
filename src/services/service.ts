// services/employeeService.ts
import api from "./api";
import { Department, Employee, EmployeeFormData } from "@/types/employee";

export const employeeService = {
  getAll: async (): Promise<Employee[]> => {
    const res = await api.get<Employee[]>("/employees");
    return res.data;
  },

  getById: async (id: number): Promise<Employee> => {
    const res = await api.get<Employee>(`/employees/${id}`);
    return res.data;
  },

  create: async (data: EmployeeFormData): Promise<Employee> => {
    const { departmentId, ...employee } = data;
    if (departmentId === "" || departmentId === undefined) {
      throw new Error("departmentId is required when creating employee");
    }
    const res = await api.post<Employee>(
      `/employees?departmentId=${departmentId}`,
      employee
    );
    return res.data;
  },

  update: async (id: number, data: EmployeeFormData): Promise<Employee> => {
    const { departmentId, ...employee } = data;
    const url =
      departmentId !== "" && departmentId !== undefined
        ? `/employees/${id}?departmentId=${departmentId}`
        : `/employees/${id}`;
    const res = await api.put<Employee>(url, employee);
    return res.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/employees/${id}`);
  },
};

export const departmentService = {
  getAll: async (): Promise<Department[]> => {
    const res = await api.get<Department[]>("/employees/departments");
    return res.data;
  },
};
