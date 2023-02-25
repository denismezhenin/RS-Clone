import i18next from 'i18next';
import { getUserById, updateUser } from '../API/users';
import { User, ToastrType } from '../data/types';
import state from '../state/state';
import popUpMessages from './popUpMessages/popupMessages';

const changePassword = async () => {
  const firstInput = document.querySelector('.new-password-input');
  const secondInput = document.querySelector('.repeat-new-password');
  const regularExpression = /[0-9a-zA-Z!@#$%^&*]{6,}/;
  if (firstInput instanceof HTMLInputElement && secondInput instanceof HTMLInputElement) {
    if (!regularExpression.test(firstInput.value)) {
      popUpMessages(ToastrType.warning, i18next.t('wrongPasswordMessage'));
    } else if (firstInput.value !== secondInput.value) {
      popUpMessages(ToastrType.warning, i18next.t('wrongPasswordRepeatMessage'));
    } else {
      const user: User = await getUserById(state.authToken, state.id);
      await updateUser(state.authToken, state.id, { name: user.name, login: user.login, password: secondInput.value });
      state.password = secondInput.value;
      document.querySelector('.shadow')?.remove();
      document.querySelector('.popup')?.remove();
      popUpMessages(ToastrType.success, i18next.t('passwordChangedMessage'));
      window.location.href = '#';
    }
  }
};
export default changePassword;
