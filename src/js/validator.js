export default function isValidInn(value) {
  const paramLuhn = controlLuhn(value);

  let paramLenght;
  if (value.length >= 14 && value.length <= 16) {
    paramLenght = true;
  } else {
    paramLenght = false;
  }

  const paramOnlyNumber = paramOnlyNumbers(value);

  const paramPay = paramPaySystem(value);

  return (paramLuhn && paramLenght && paramOnlyNumber && paramPay);
}

function paramPaySystem(value) { // paramPay не принадлежит ни одной системе -> false
  if (paySystem(value) != null) {
    return true;
  }
  return false;
}

export function paySystem(value) { // paramPay не принадлежит ни одной системе -> false
  let payClass = null;
  if (/^4/.test(value)) {
    payClass = '.visa';
  } if (/^5[1-5]/.test(value)) {
    payClass = '.mastercard';
  } if (/^3[47]/.test(value)) {
    payClass = '.amex';
  } if (/^(?:2131|1800|35\d{3})\d{11}/.test(value)) {
    payClass = '.jcb';
  } if (/^2/.test(value)) {
    payClass = '.mir';
  } if (/^6(?:011|5)/.test(value)) {
    payClass = '.discover';
  } if (/^3(?:0[0-5]|[68])/.test(value)) {
    payClass = '.diners';
  }
  return payClass; // все время возвращает мир!!!
}

function paramOnlyNumbers(value) { // содержит не цифры -> false
  const regex = /^[0-9]+$/;
  return regex.test(value);
}

function controlLuhn(value) { // метод луна
  let sum = 0;
  let even = false;
  if (value) {
    const temp = String(value).replace(/[^\d]/g, '');
    for (let i = temp.length - 1; i >= 0; i -= 1) {
      let int = parseInt(temp.charAt(i), 10);
      if (even) {
        int *= 2;
        if (int > 9) {
          int -= 9;
        }
      }
      sum += int;
      even = !even;
    }
    return (sum % 10) === 0;
  }
  return false;
}
// 4276807014927948 valid
// 4276844027853696 valid
// 2202200112561350 мир +
// 4000123456789017 виза +
// 5412751234123452 мастеркард +
// 3540123456789016 jcb +
// 30220298952472 diner +
// 6011004440227649 discover +
// 378742263945793 amex +
