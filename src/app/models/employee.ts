export interface Employee {
  id: number;
  name: string;
  phone: string;
  jobTitle: string;
}


export interface EmployeeData {
  content: Employee[]
  size: number,
  totalElements: number,
  totalPages: number
}
