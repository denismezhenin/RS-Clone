import i18next from 'i18next';
import UI from '../../data/UI';

const getNavBarHtml = async () =>
  `
  <div class="header__wrapper">
    <a class="logo" href="/#">
      <h1 class="logo-header">${UI.headerLogo}</h1>
          </a>
    <div class="navbar">
    <button class='hide-aside__button'></button>
      <input class="input search-input" placeholder=${i18next.t('searchInputText')}>
      <div class="hidden">
        <h3 class="user-name">Ivan Ivanov</h3>
        <div class="user-img"></div>
      </div>
      <div class="sign">
        <a class="sign-in" href="/#/signin">${i18next.t('signIn')}</a>
        <a class="button sign-up-button" href="/#/signup">${i18next.t('signUp')}</a>
      </div>
    
      <button class="burger-menu__button">
      <span></span>
      <span></span>
      <span></span>
    </button>
   
    </div>
  </div>
  `;

export default getNavBarHtml;
