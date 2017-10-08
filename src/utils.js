export function getControlValue(fieldValue) {
  return fieldValue === null ? '' : fieldValue;
}

export function pad(num, digits) {
  const strNum = `${num}`;
  return strNum.length >= digits
    ? strNum
    : new Array((digits - strNum.length) + 1).join(0) + strNum;
}
