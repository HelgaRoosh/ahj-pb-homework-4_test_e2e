export default function isValidInn(value) {
  return value.length >= 14 && value.length <= 16;
}
