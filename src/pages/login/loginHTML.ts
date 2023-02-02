import { sign } from '../../data/types';

export const loginHTML = (page: sign) => {
  const str = `<div class="login">
  <form action="" onsubmit="return false" class="login__form ${
    page === 'signin' ? 'signin' : 'signup'
  }">
    <fieldset>
      <legend class="login__form-tittle">${
        page === 'signin' ? 'Sign in' : 'Sign up'
      }</legend>
      <label for="name" class="login__form-label" style="${
        page === 'signin' ? 'display:none' : ''
      }">Name</label>
      <input type="text" required class="login__form-name" id="name" name="name" placeholder="example@gmail.com" style="${
        page === 'signin' ? 'display:none' : ''
      }">
      <label for="email" class="login__form-label">Email</label>
      <input type="email" required class="login__form-email" id="email" name="email" placeholder="example@gmail.com">
      <label for="password" class="login__form-label">Password</label>
      <input type="password" required class="login__form-password" name="password" id="password" placeholder="********">
      <button type="submit" class="login__form-submit">Log in</button>
    </fieldset>
  </form>
  <p class="login__message">Don't have an account? <a href="#" class="login__message-link">${
    page === 'signin' ? 'Sign up' : 'Sign in'
  }</a></p>
</div>
`;
  return str;
};

export default loginHTML;
