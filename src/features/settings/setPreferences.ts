import state from '../../state/state';

const setPreferences = () => {
  if (state.theme === 'dark') {
    document.body.classList.add('dark-theme');
    const main = document.body.children[1];
    main.classList.add('dark-theme');
  }

  const inputEnglish = document.querySelector('.english');
  const inputRussian = document.querySelector('.russian');
  if (inputEnglish instanceof HTMLInputElement && inputRussian instanceof HTMLInputElement) {
    if (state.language === 'ru') {
      inputEnglish.checked = false;
      inputRussian.checked = true;
    }
    if (state.language === 'en') {
      inputEnglish.checked = true;
      inputRussian.checked = false;
    }
  }
};

export default setPreferences;
