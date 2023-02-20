import i18next from 'i18next';
import { getUserById, signIn, signUp } from '../../API/users';
import { FormsData, ToastrType } from '../../data/types';
import popUpMessages from '../../features/popUpMessages/popupMessages';
import { tsQuerySelector } from '../../helpers/helpers';
import state from '../../state/state';

const userForm = () => {
  const loginForm = tsQuerySelector<HTMLFormElement>(document, '.login__form');
  const searchInput = tsQuerySelector(document, '.search-input');
  const burgerMenuButton = tsQuerySelector(document, '.burger-menu__button');
  const navbar = tsQuerySelector(document, '.navbar');

  searchInput.style.display = 'none';
  burgerMenuButton.style.display = 'none';
  navbar.style.justifyContent = 'right';
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const name = String(formData.get(FormsData.name));
    const email = String(formData.get(FormsData.email));
    const password = String(formData.get(FormsData.password));
    if (!email || !password) return;
    if (loginForm.classList.contains(FormsData.signup)) {
      const response = await signUp({ name, login: email, password });
      if (!response) {
        return;
      }
      window.location.href = '#/signin';
    }
    if (loginForm.classList.contains(FormsData.signin)) {
      const response = await signIn({ login: email, password });

      if (response.token) {
        state.authToken = response.token;
        state.id = response.id;
        state.password = password;
        const user = await getUserById(state.authToken, state.id);
        if (user.name) {
          state.name = user.name;
        }

        window.location.href = '#/';
        popUpMessages(ToastrType.success, `${i18next.t('singInMessage')}`);
        searchInput.style.display = '';
        burgerMenuButton.style.display = '';
      }
    }
  });
};
export default userForm;
