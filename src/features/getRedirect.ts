import { INVALID_TOKEN } from '../constants/constants';

const getRedirect = (response: string) => {
  if (response === INVALID_TOKEN) {
    window.location.href = '#/signin';
  }
};
export default getRedirect;
