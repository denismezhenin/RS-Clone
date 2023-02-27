import i18next from 'i18next';
import { getUserById, updateUser } from '../API/users';
import { User, ToastrType } from '../data/types';
import state from '../state/state';
import popUpMessages from './popUpMessages/popupMessages';

const changeUserName = async () => {
  const input = document.querySelector('.new-name-input');
  const regularExpression = /[a-zA-Z]{3,}/;
  if (input instanceof HTMLInputElement) {
    if (!regularExpression.test(input.value)) {
      popUpMessages(ToastrType.warning, i18next.t('wrongNameMessage'));
    } else {
      const { value } = input;
      const user: User = await getUserById(state.authToken, state.id);
      await updateUser(state.authToken, state.id, { name: value, login: user.login, password: state.password });
      state.name = value;
      document.querySelector('.shadow')?.remove();
      document.querySelector('.popup')?.remove();
      popUpMessages(ToastrType.success, i18next.t('nameChangedMessage'));
      window.location.href = '#';
    }
  }
};
export default changeUserName;
