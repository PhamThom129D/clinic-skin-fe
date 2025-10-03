// Department chỉ dùng cho dropdown/select
export interface Department {
  id: number;
  name: string;
}


export interface Employee {
  id: number;
  code: string;
  name: string;
  age: number;
  salary: number;
  departmentId?: number;
  departmentName?: string;
}



// Dữ liệu form khi tạo/cập nhật
export interface EmployeeFormData {
    code : string;
  name: string;
  age: number;
  salary: number;
  departmentId: number | ""; 
}
