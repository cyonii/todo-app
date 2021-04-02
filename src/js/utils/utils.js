function generateRandomChar() {
  const characters = "abcdefghijklmnopqrstuvwxyz".toUpperCase();

  return characters.charAt(Math.floor(Math.random() * 1));
}

export function randomID() {
  const digits = Math.floor(Math.random(425367) * 10000000000);
  const char = generateRandomChar();
  return char + digits.toString();
}
