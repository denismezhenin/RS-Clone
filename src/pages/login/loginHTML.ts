import i18next from 'i18next';
import { sign } from '../../data/types';

const loginHTML = (page: sign) => {
  const str = `<div class="login">
  <form action="" onsubmit="return false" class="login__form ${page === 'signin' ? 'signin' : 'signup'}">
    <fieldset>
      <legend class="login__form-tittle">${page === 'signin' ? i18next.t('signIn') : i18next.t('signUp')}</legend>
      <div class="login__form-input-wrapper input-wrapper" style="${page === 'signin' ? 'display:none' : ''}">
      <input type="text" ${
        page === 'signin' ? '' : 'required'
      } class="input-wrapper-name form-input" id="name" name="name" minlength="3">
      <span class="input-wrapper-highlight"></span>
      <span class="input-wrapper-bar"></span>
      <label for="name" class="form-label" style="${page === 'signin' ? 'display:none' : ''}">${i18next.t(
    'labelName'
  )}</label>
      </div>
      <div class="login__form-input-wrapper input-wrapper">
      <input type="text" required class="input-wrapper-email form-input" id="email" name="email">   
      <span class="input-wrapper-highlight"></span>
      <span class="input-wrapper-bar"></span>
      <label for="email" class="form-label">${i18next.t('labelEmail')}</label>
      </div>
      <div class="login__form-input-wrapper input-wrapper">
      <input type="password" required class="login__form-password form-input" name="password" id="password minlength="8">
      <span class="input-wrapper-highlight"></span>
      <span class="input-wrapper-bar"></span>
      <label for="password" class="form-label">${i18next.t('labelPassword')}</label>
      </div>
      <button type="submit" class="button login__form-submit">${page === 'signin' ? 'Sign in' : 'Sign up'}</button>
    </fieldset>
    <p class="login__message">${i18next.t('isAccount')} <a href=${
    page === 'signin' ? '#/signup' : '#/signin'
  } class="login__message-link">${page === 'signin' ? i18next.t('signUp') : i18next.t('signIn')}</a></p>
  </form>
</div>
`;
  return str;
};

export default loginHTML;
