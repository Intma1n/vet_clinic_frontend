import axios from 'axios';

const API_MAIN_URL = 'http://127.0.0.1:5000';

const apiRoutes = {
  clients: '/clients',
  employees: '/employees',
  directorAuth: '/directors',
  adminAuth: '/moderators',
  employeeAuth: '/employeeauth',
  clientAuth: '/clients_auth',
  animals: '/animals',
  setAnimal: '/set_animal',
  procedures: '/procedures',
  procedure: '/procedure',
  analyses: '/analyses',
  diagnosis: '/diagnos',
  treatment: '/treatment',
  setTreatment: 'set_treatment',
  allClients: '/all_clients',
  clinicComments: '/clinic_comments',
  internToAnimal: '/intern_to_animal',
  doctorToAnimal: '/doctor_to_animal',
  internToDoctor: '/intern_to_doctor',
  analyzes: '/analyzes',
};

interface IEmployee {
  firstname: string;
  lastname: string;
  phone_number: string;
  password: string;
  age: string;
  stage: string;
  salary: string;
  position: string;
  document_id: string;
}
interface IClient {
  firstname: string;
  lastname: string;
  phone_number: string;
  password: string;
}
interface IAnimal {
  animal_name: string;
  animal_type: string;
  animal_breed: string;
  client_id: string;
}
interface IProcedure {
  procedure_name: string;
}
interface IDiagnosis {
  diagnosis_name: string;
}
interface IAnalysis {
  analysis_name: string;
}
interface ITreatment {
  treatment_name: string;
}

export const addEmployee = async (data: IEmployee) => {
  return await axios.post(`${API_MAIN_URL + apiRoutes.employees}`, data);
};

export const addClient = async (data: IClient) => {
  return await axios.post(`${API_MAIN_URL + apiRoutes.clients}`, data);
};

export const addAnimal = async (data: IAnimal) => {
  return await axios.post(`${API_MAIN_URL + apiRoutes.setAnimal}`, data);
};

export const addDiagnosis = async (data: IDiagnosis, animalId: string) => {
  return await axios.post(`${API_MAIN_URL + apiRoutes.diagnosis}/${animalId}`, data);
};

export const addProcedure = async (data: IProcedure, animalId: string) => {
  return await axios.post(`${API_MAIN_URL + apiRoutes.procedure}/${animalId}`, data);
};

export const addAnalysis = async (analysName: string, animalId: number) => {
  const data = { analyzes_type: analysName, analys_status: 'appointed' };
  return await axios.post(`${API_MAIN_URL + apiRoutes.analyzes}/${animalId}`, data);
};

export const addComment = async (comment_text: string) => {
  const data = { comment_text };
  return await axios.post(`${API_MAIN_URL + apiRoutes.clinicComments}`, data);
};

export const clientRegister = async (data: IClient) => {
  return await axios.post(`${API_MAIN_URL + apiRoutes.clients}`, data);
};

export const employeeRegister = async (data: IEmployee) => {
  return await axios.post(`${API_MAIN_URL + apiRoutes.employees}`, data);
};

export const clientAuth = async (data: IClient) => {
  return await axios.post(`${API_MAIN_URL + apiRoutes.clientAuth}`, data);
};

export const employeeAuth = async (data: IClient) => {
  return await axios.post(`${API_MAIN_URL + apiRoutes.employeeAuth}`, data);
};

export const directorAuth = async (data: IClient) => {
  return await axios.post(`${API_MAIN_URL + apiRoutes.directorAuth}`, data);
};

export const adminAuth = async (data: IClient) => {
  return await axios.post(`${API_MAIN_URL + apiRoutes.adminAuth}`, data);
};

export const getClients = async () => {
  return await axios.get(`${API_MAIN_URL + apiRoutes.allClients}`);
};

export const getAnimals = async (clientId: string) => {
  return await axios.get(`${API_MAIN_URL + apiRoutes.animals}/${clientId}`);
};

export const getEmployees = async () => {
  return await axios.get(`${API_MAIN_URL + apiRoutes.employees}`);
};

export const getProcedures = async (animalId: string) => {
  return await axios.get(`${API_MAIN_URL + apiRoutes.procedures}/${animalId}`);
};

export const getAnalyses = async (animalId: string) => {
  return await axios.get(`${API_MAIN_URL + apiRoutes.analyses}/${animalId}`);
};

export const getTreatment = async (animalId: string) => {
  return await axios.get(`${API_MAIN_URL + apiRoutes.treatment}/${animalId}`);
};

export const getDiagnosis = async (animalId: string) => {
  return await axios.get(`${API_MAIN_URL + apiRoutes.diagnosis}/${animalId}`);
};

export const getNurses = async () => {
  // return await axios.get(`${API_MAIN_URL + apiRoutes.nurses}/${animalId}`);
};

export const deleteEmployee = async (employeeId: string) => {
  return await axios.delete(`${API_MAIN_URL + apiRoutes.employees}/${employeeId}`);
};

export const patchAnalysis = async (data: IAnalysis, analysisId: string) => {
  return await axios.patch(`${API_MAIN_URL + apiRoutes.analyses}/${analysisId}`, data);
};

export const patchProcedure = async (data: IProcedure, procedureId: string) => {
  return await axios.patch(`${API_MAIN_URL + apiRoutes.analyses}/${procedureId}`, data);
};

export const patchEmployee = async (data: IEmployee) => {
  return await axios.patch(`${API_MAIN_URL + apiRoutes.employees}`, data);
};

export const addDoctorToAnimal = async (doctorId: string, animalId: string) => {
  return await axios.post(`${API_MAIN_URL}${apiRoutes.doctorToAnimal}`);
};

export const addTreatment = async (animalId: string, treatmentName: string) => {
  const data = { treatment_name: treatmentName };
  return axios.post(`${API_MAIN_URL}/${apiRoutes.setTreatment}/${animalId}`, data);
};

export const addInternToDoctor = async (intern_id: string, doctor_id: string) => {
  return await axios.post(`${API_MAIN_URL}${apiRoutes.internToDoctor}`, {
    intern_id: intern_id.toString(),
    doctor_id: doctor_id.toString(),
  });
};
