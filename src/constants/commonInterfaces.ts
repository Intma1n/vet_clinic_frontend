export interface IClient {
  clientId: string;
  firstname: string;
  lastname: string;
  phone_number: string;
}

export interface IEmployee {
  employee_id: string;
  firstname: string;
  lastname: string;
  phone_number: string;
  sex: string;
  age: string;
  stage: string;
  position: string;
  salary: string;
  document_id: string;
}

export interface IAnimal {
  animal_id: string;
  animal_name: string;
  animal_age: string;
  animal_type: string;
  animal_breed: string;
  animal_sex: string;
}

export interface IAnalysis {
  analyses_id: string;
  analyses_name: string;
  status: string;
}

export interface IProcedure {
  procedure_id: string;
  procedure_name: string;
  status: string;
}

export interface ITreatment {
  treatment_id: string;
  treatment_name: string;
  animal_id: string;
}

export interface IDiagnosis {
  diagnosis_id: string;
  illness: string;
  itherapy: string;
}
