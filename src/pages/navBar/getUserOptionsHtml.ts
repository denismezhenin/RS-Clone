import { ICreateUser } from '../../data/types';
import UI from '../../data/UI';

const getUserOptionsHtml = (user: ICreateUser) => `
  <h4 class="user-email">${user.login}</h4>
  <details class="name-change">
    <summary>${UI.nameSummary}</summary>
    <div class="new-name-block">
      <input required class="input new-name-input" type="text" placeholder=${user.name} minlength="3">
      <button class="button change-name-button">${UI.changeButton}</button>
    </div>
  </details>
  <details class="login-change">
    <summary>${UI.loginSummary}</summary>
    <div class="new-login-block">
      <input required class="input new-login-input" type="email" placeholder=${user.login}>
      <button class="button change-login-button">${UI.changeButton}</button>
    </div>
  </details>
  <details class="password-change">
    <summary>${UI.passwordSummary}</summary>
    <div class="new-password-block">
      <input required class="input new-password-input" type="password" minlength="8" placeholder="Enter new password">
      <input required class="input repeat-new-password" type="password" minlength="8" placeholder="Repeat new password">
      <button class="button change-password-button">${UI.changeButton}</button>
    </div>
  </details>
  <button class="button logout-button">${UI.logoutButton}</button>
`;

export default getUserOptionsHtml;
