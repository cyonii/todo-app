import { generateRandomStr, randomID, parser, setAttributes } from '../../src/js/utils/utils';

describe('parser', () => {
  it('returns a parsed html from strings', () => {
    const el = document.createElement('div');
    const parsedHTML = parser('<h1>H1 tag</h1>');
    expect(() => el.appendChild(parsedHTML)).not.toThrow(TypeError);
  });
});

describe('generateRandomStr', () => {
  it('generates string with length of passed argument', () => {
    expect(generateRandomStr().length).toEqual(1);
  });
});

describe('randomID', () => {
  it('generates a random ID matching pattern', () => {
    expect(randomID()).toMatch(/^[A-Z]{1}\d{8,10}$/);
  });
});

describe('setAttributes', () => {
  it('sets given attributes to the passed element', () => {
    const el = document.createElement('a');
    const attributes = { id: 'testID', href: '#', 'data-temp': '4567' };
    setAttributes(el, attributes);

    Object.keys(attributes).forEach((attr) => {
      expect(el.hasAttribute(attr)).toBe(true);
    });
  });
});
