export interface IInitialFormState {
  name: string;
  surname: string;
  phoneNumber: string;
  password: string;
  position?: string;
  age?: string;
  stage?: string;
  salary?: string;
  documentId?: string;
}

export interface IUserType {
  userType: 'director' | 'admin' | 'employee' | 'client';
}
