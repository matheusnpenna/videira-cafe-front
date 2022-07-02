/* eslint-disable */
export function toHumanDate(date) {
  return date
    .split("-")
    .reverse()
    .join("/");
}

export function dayDiff(dateString) {
  var today = new Date();
  var date = new Date(dateString);

  // To calculate the time difference of two dates
  var differenceInTime = date.getTime() - today.getTime();

  // To calculate the no. of days between two dates
  return Math.floor(differenceInTime / (1000 * 3600 * 24));
}

export const emojis = [
  "😁",
  "😂",
  "😃",
  "😄",
  "😅",
  "😆",
  "😉",
  "😊",
  "😋",
  "😌",
  "😍",
  "😏",
  "😒",
  "😓",
  "😔",
  "😖",
  "😘",
  "😚",
  "😜",
  "😝",
  "😞",
  "😠",
  "😢",
  "😤",
  "😥",
  "😨",
  "😩",
  "😪",
  "😫",
  "😭",
  "😰",
  "😱",
  "😲",
  "😳",
  "😵",
  "😷",
  "😸",
  "😹",
  "😺",
  "😻",
  "😼",
  "😽",
  "😾",
  "😿",
  "🙀",
  "🙅",
  "🙆",
  "🙇",
  "🙈",
  "🙉",
  "🙊",
  "🙋",
  "🙌",
  "🙍",
  "🙎",
  "🙏"
];

export const formFields = (fields, initial = {}) => {
  const form = {};
  const errors = {};
  for (const i in fields) {
    const field = fields[i];
    form[field] = initial && initial[field] ? initial[field] : "";
    errors[field] = [];
  }
  return { form, errors, loading: false };
};


export const removeMask = maskedValue => {
  return maskedValue
    .replace(/\s/g, "")
    .replace(/-/g, "")
    .replace(/\(/g, "")
    .replace(/\)/g, "")
    .replace(/\D/g, "")
    .trim();
};

export const getYearRange = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export const clearObject = object => {
  for (const i in object) {
    if (object[i] === "" || object[i] === undefined || object[i] === null) {
      delete object[i];
    }
  }
  return object;
};


export function isValidCPF(cpf) {
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
  cpf = cpf.split("");
  const validator = cpf
    .filter((digit, index, array) => index >= array.length - 2 && digit)
    .map(el => +el);
  const toValidate = pop =>
    cpf
      .filter((digit, index, array) => index < array.length - pop && digit)
      .map(el => +el);
  const rest = (count, pop) =>
    ((toValidate(pop).reduce((soma, el, i) => soma + el * (count - i), 0) *
      10) %
      11) %
    10;
  return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1]);
}

export function isValidCNPJ(cnpj) {
  const format = value => value.replace(/[^\d]+/g, "");
  const isValidNumber = (value, count) =>
    format(value).length === count && !format(value).match(/(\d)\1{10}/);
  const sum = (array, start) =>
    array.reduce((total, el, i) => total + el * (start - i), 0);
  const rest = value => value % 11;

  const validator = value =>
    format(value)
      .split("")
      .splice(format(value).length - 2)
      .map(el => +el);

  const toValidate = (value, end, start = 0) =>
    format(value)
      .split("")
      .filter((digit, index, array) => index >= start && index <= end && digit)
      .map(el => +el);

  const validate = (firstDigit, lastDigit, validator) =>
    firstDigit === validator[0] && lastDigit === validator[1];

  if (!isValidNumber(cnpj, 14)) return false;

  const digit = sum => (rest(sum) < 2 ? 0 : 11 - rest(sum));

  const firstDigit = digit(
    sum(toValidate(cnpj, 3), 5) + sum(toValidate(cnpj, 11, 4), 9)
  );
  const lastDigit = digit(
    sum(toValidate(cnpj, 4), 6) + sum(toValidate(cnpj, 12, 5), 9)
  );

  return validate(firstDigit, lastDigit, validator(cnpj));
}

export function createObjectURL(blob) {
  const URL_API = URL || webkitURL;

  return URL_API.createObjectURL(blob);
}

export function revokeObjectURL(url_) {
  const URL_API = URL || webkitURL;

  return URL_API.revokeObjectURL(url_);
}