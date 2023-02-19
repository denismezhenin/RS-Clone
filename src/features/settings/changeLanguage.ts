import i18next from 'i18next';
import state from '../../state/state';
import en from '../../data/en.json';
import ru from '../../data/ru.json';
import changeVisibleElements from './changeVisibleElements';

const changeLanguage = (event: Event) => {
  const { target } = event;

  if (target instanceof HTMLInputElement) {
    if (target.classList.contains('russian')) {
      state.language = 'ru';
    }
    if (target.classList.contains('english')) {
      state.language = 'en';
    }

    i18next.init({
      fallbackLng: 'en',
      lng: state.language,
      resources: {
        en: {
          translation: en,
        },
        ru: {
          translation: ru,
        },
      },
    });

    changeVisibleElements();
  }
};

export default changeLanguage;
