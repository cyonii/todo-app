export function generateRandomStr(length = 1) {
  const characters = "abcdefghijklmnopqrstuvwxyz".toUpperCase();

  return characters.charAt(Math.floor(Math.random() * length));
}

export function randomID() {
  const digits = Math.floor(Math.random(425367) * 10000000000);
  const char = generateRandomStr();
  return char + digits.toString();
}

export function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}
