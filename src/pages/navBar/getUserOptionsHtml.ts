import i18next from 'i18next';
import { ICreateUser } from '../../data/types';

const getUserOptionsHtml = (user: ICreateUser) => `
  <h4 class="user-email">${user.login}</h4>
  <details class="name-change" open>
    <summary>${i18next.t('nameSummary')}</summary>
    <div class="new-name-block">
      <input required class="input new-name-input" type="text" placeholder=${user.name} minlength="3">
      <button class="button change-name-button">${i18next.t('changeButton')}</button>
    </div>
  </details>
  <details class="login-change" open>
    <summary>${i18next.t('loginSummary')}</summary>
    <div class="new-login-block">
      <input required class="input new-login-input" type="email" placeholder=${user.login}>
      <button class="button change-login-button">${i18next.t('changeButton')}</button>
    </div>
  </details>
  <details class="password-change" open>
    <summary>${i18next.t('passwordSummary')}</summary>
    <div class="new-password-block">
      <input required class="input new-password-input" type="password" minlength="8" placeholder="Enter new password">
      <input required class="input repeat-new-password" type="password" minlength="8" placeholder="Repeat new password">
      <button class="button change-password-button">${i18next.t('changeButton')}</button>
    </div>
  </details>
  <button class="button logout-button">${i18next.t('logoutButton')}</button>
`;

export default getUserOptionsHtml;
