import state from '../../state/state';

const changeTheme = (event: Event) => {
  const { target } = event;
  if (target instanceof HTMLInputElement) {
    document.body.classList.toggle('dark-theme');
    const main = document.body.children[1];
    main.classList.toggle('dark-theme');

    if (document.body.classList.contains('dark-theme')) {
      state.theme = 'dark';
    } else {
      state.theme = 'light';
    }
  }
};

export default changeTheme;
