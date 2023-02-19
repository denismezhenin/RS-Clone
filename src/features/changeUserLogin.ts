import { getUserById, updateUser } from '../API/users';
import { User, ToastrType } from '../data/types';
import state from '../state/state';
import popUpMessages from './popUpMessages/popupMessages';
import UI from '../data/UI';

const changeUserLogin = async () => {
  const input = document.querySelector('.new-login-input');
  const regularExpression =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (input instanceof HTMLInputElement) {
    if (!regularExpression.test(input.value)) {
      popUpMessages(ToastrType.error, UI.wrongEmailMessage);
    } else {
      const { value } = input;
      const user: User = await getUserById(state.authToken, state.id);
      await updateUser(state.authToken, state.id, { name: user.name, login: value, password: state.password });
      document.querySelector('.shadow')?.remove();
      document.querySelector('.popup')?.remove();
      window.location.href = '#';
    }
  }
};

export default changeUserLogin;
