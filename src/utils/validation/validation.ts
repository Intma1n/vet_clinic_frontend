import { PHONE_NUMBER_REGEX } from '../regexes';

export const validatePhoneNumber = (phoneNumber: string) => {
  return Boolean(phoneNumber.match(PHONE_NUMBER_REGEX));
};
