export const parseError = (payload) => payload.substring(payload.length - 3, payload.length);

export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validateRut = (rut) => {
  console.log(rut);
  const rutFormat = /^([1-9][0-9]?)([0-9]{3})([0-9]{3})-([0-9|k|K]{1})$/;
  if (!rut.match(rutFormat)) return true;

  const reversedRut = rut.split('').reverse();
  const validDigit = 11
    - (reversedRut
      .slice(2)
      .reduce((acc, item, index) => acc + parseInt(item, 10) * ((index % 6) + 2), 0)
      % 11);

  if (validDigit === 11) return reversedRut[0] === '0';
  if (validDigit === 10) return reversedRut[0].toLowerCase() === 'k';

  return String(validDigit) === reversedRut[0];
};
