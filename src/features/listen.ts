import { FUNCTIONS } from '../constants/constants';
import { FunctionsKeys } from '../data/types';

const listen = (event: MouseEvent) => {
  const keys = <FunctionsKeys[]>Object.keys(FUNCTIONS);
  const { target } = event;
  if (target && target instanceof HTMLElement) {
    keys.forEach(async (el) => {
      if (target.classList.contains(el)) {
        await FUNCTIONS[el](event);
      }
    });
  }
};

export default listen;
