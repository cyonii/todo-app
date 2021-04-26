export const parser = Range.prototype.createContextualFragment.bind(document.createRange());

export function randomID() {
  const digits = String(Math.random()).split('.')[1].substr(0, 10);
  return `ID${digits}`;
}

export function setAttributes(el, attrs) {
  Object.entries(attrs).forEach((entry) => el.setAttribute(entry[0], entry[1]));
}
