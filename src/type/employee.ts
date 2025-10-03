export interface Department {
  id: number;
  name: string;
}

export interface Employee {
  id: number;
  name: string;
  age: number;
  salary: number;
  department?: Department;
}

export interface EmployeeFormData {
  name: string;
  age: number;
  salary: number;
  departmentId: number | "";
}
