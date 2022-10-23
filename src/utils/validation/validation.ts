import {
  NAMES_REGEX,
  NUMBERS_REGEX,
  PASSWORD_REGEX,
  PHONE_NUMBER_REGEX,
} from '../regexes';

export const validatePhoneNumber = (phoneNumber: string) => {
  return Boolean(phoneNumber.match(PHONE_NUMBER_REGEX));
};

export const validatePassword = (password: string) => {
  return Boolean(password.match(PASSWORD_REGEX));
};

export const validateName = (name: string) => {
  return Boolean(name.match(NAMES_REGEX));
};

export const validateAge = (age: string) => {
  return Boolean(age.match(NUMBERS_REGEX)) && age.length === 2;
};

export const validateStage = (stage: string, age: string) => {
  return Boolean(stage.match(NUMBERS_REGEX)) && stage.length <= 2 && +stage < +age;
};

export const validateDocumentId = (documentId: string) => {
  return Boolean(documentId.match(NUMBERS_REGEX)) && documentId.length === 6;
};
