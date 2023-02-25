import i18next from 'i18next';
import { getUserById, updateUser } from '../API/users';
import { User, ToastrType } from '../data/types';
import state from '../state/state';
import popUpMessages from './popUpMessages/popupMessages';

const changeUserLogin = async () => {
  const input = document.querySelector('.new-login-input');
  const regularExpression =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (input instanceof HTMLInputElement) {
    if (!regularExpression.test(input.value)) {
      popUpMessages(ToastrType.warning, i18next.t('wrongEmailMessage'));
    } else {
      const { value } = input;
      const user: User = await getUserById(state.authToken, state.id);
      await updateUser(state.authToken, state.id, { name: user.name, login: value, password: state.password });
      document.querySelector('.shadow')?.remove();
      document.querySelector('.popup')?.remove();
      popUpMessages(ToastrType.success, i18next.t('emailChangedMessage'));
      window.location.href = '#';
    }
  }
};

export default changeUserLogin;
