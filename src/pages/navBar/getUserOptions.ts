import { getUserById } from '../../API/users';
import { ICreateUser } from '../../data/types';
import state from '../../state/state';
import toggleUserPopup from '../../features/toggleUserPopup';
import getUserOptionsHtml from './getUserOptionsHtml';

const getUserOptions = async () => {
  const user: ICreateUser = await getUserById(state.authToken, state.id);
  document.querySelector('.shadow')?.remove();
  document.querySelector('.popup')?.remove();

  const popup = document.createElement('div');
  popup.classList.add('popup');
  const shadow = document.createElement('div');
  shadow.classList.add('shadow');
  document.body.append(shadow, popup);

  popup.classList.add('popup-user');
  shadow.classList.add('shadow-active');
  shadow.addEventListener('click', toggleUserPopup);

  popup.innerHTML = getUserOptionsHtml(user);
};

export default getUserOptions;
