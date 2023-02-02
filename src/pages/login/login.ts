import { FormsData } from '../../data/types';
import { tsQuerySelector } from '../../helpers/helpers';

const createCarFromForm = () => {
  const loginForm = tsQuerySelector<HTMLFormElement>(document, '.login');
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const email = String(formData.get(FormsData.email));
    const password = String(formData.get(FormsData.password));
    if (!email || !password) return;
    await { email, password };
  });
};
createCarFromForm();
