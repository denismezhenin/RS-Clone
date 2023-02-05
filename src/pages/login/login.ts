import { getUserById, signIn, signUp } from '../../API/users';
import { FormsData } from '../../data/types';
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
      if (response) {
        state.authToken = response.token;
        state.id = response.id;
        const user = await getUserById(state.authToken, state.id);
        if (user.name) {
          state.name = user.name;
        }
        window.location.href = '#/';
      }
    }
  });
};
export default userForm;
