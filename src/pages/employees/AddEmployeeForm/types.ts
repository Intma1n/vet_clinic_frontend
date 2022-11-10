export interface IInitialFormState {
  employee_id: string;
  firstname: string;
  lastname: string;
  phone_number: string;
  password: string;
  position: string;
  age: string;
  stage: string;
  salary: string;
  document_id: string;
}

export interface IAddEmployeeForm {
  isUpdating?: boolean;
}
