import state from '../state/state';

const logOut = () => {
  state.authToken = '';
  state.id = '';
  state.name = '';
  document.querySelector('.shadow')?.remove();
  document.querySelector('.popup')?.remove();
  window.location.href = '#/signin';
};

export default logOut;
