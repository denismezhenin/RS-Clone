import { getUserById, signIn, signUp } from '../../API/users';
import { FormsData, ToastrType } from '../../data/types';
import popUpMessages from '../../features/popUpMessages/popupMessages';
import { tsQuerySelector } from '../../helpers/helpers';
import state from '../../state/state';

const userForm = () => {
  const loginForm = tsQuerySelector<HTMLFormElement>(document, '.login__form');

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
        const user = await getUserById(state.authToken, state.id);
        if (user.name) {
          state.name = user.name;
        }
        window.location.href = '#/';
        popUpMessages(ToastrType.success, 'You are sign in!');
      }
    }
  });
};
export default userForm;
