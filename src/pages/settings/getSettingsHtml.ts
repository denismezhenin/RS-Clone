import i18next from 'i18next';
import getAsideHtml from '../home/getAsideHtml';

const getSettingsHtml = () =>
  `
  <div class="main_home">
  ${getAsideHtml()}
  <div class="main-settings">
    <section class="theme-section">
      <h4 class="settings-header settings-header_theme">${i18next.t('chooseTheme')}</h4>
      <form class="theme-form">
        <label class="radio-label">
          <input class="dark" type="radio" name="question">
          <span></span>
          <img src="../assets/img/dark_theme.png" class="theme-image" alt="Dark theme">
        </label>
        <label class="radio-label">
          <input class="light" type="radio" name="question" checked>
          <span></span>
          <img src="../assets/img/light_theme.png" class="theme-image" alt="Light theme">
        </label>
      </form>
    </section>
    <section class="language-section">
      <h4 class="settings-header settings-header_language">${i18next.t('chooseLanguage')}</h4>
      <form class="language-form">
        <label class="radio-label">
          <input class="russian" type="radio" name="question">
          <span class="lang">RU</span>
        </label>
        <label class="radio-label">
          <input class="english" type="radio" name="question" checked>
          <span class="lang">EN</span>
        </label>
      </form>
    </section>
  </div>
  </div>
  `;

export default getSettingsHtml;
