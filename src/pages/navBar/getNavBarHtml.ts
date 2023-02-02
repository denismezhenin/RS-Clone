import UI from '../../data/UI';

const getNavBarHtml = () =>
  `
  <div class="header__wrapper">
    <a class="logo">
      <h1 class="logo-header">${UI.headerLogo}</h1>
    </a>
    <div class="navbar">
      <input class="input search-input" placeholder=${UI.searchInputText}>
      <div class="hidden">
        <h3 class="user-name">Ivan Ivanov</h3>
        <div class="user-img"></div>
      </div>
      <div class="sign">
        <a class="sign-in">${UI.signIn}</a>
        <button class="button sign-up-button">${UI.signUp}</button>
      </div>
    </div>
  </div>
  `;

export default getNavBarHtml;
