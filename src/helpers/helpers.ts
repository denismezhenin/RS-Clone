export function tsQuerySelector<T extends HTMLElement>(parent: Element | Document, selector: string): T {
  const element = parent.querySelector<T>(selector);
  if (!element) {
    throw new Error('No such element');
  }
  return element;
}

export function tsQuerySelectorAll<T extends HTMLElement>(parent: Element | Document, selector: string) {
  const element = parent.querySelectorAll<T>(selector);
  if (!element) {
    throw new Error('No such element');
  }
  return element;
}

export const rgbToHex = (str: string) => {
  const hex = str
    .slice(4, -1)
    .split(',')
    .map((el: string) => Number(el).toString(16))
    .map((el: string) => el.padStart(2, '0'))
    .join('');
  return `#${hex}`;
};

export const getDate = () => Date.today().setTimeToNow().toString('dd-MM-yyyy HH:mm');