export const WEAK_PASSWORD_MSG: string =
  'Password should contain at least 8 characters, which 1 is number, one is capital and one is small';
export const PASSWORD_REGEX: RegExp = /^.*(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
