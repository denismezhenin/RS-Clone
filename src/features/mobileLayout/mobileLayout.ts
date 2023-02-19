import { tsQuerySelector } from '../../helpers/helpers';

const hideBurgerMenu = (e: Event) => {
  if (!(e.target instanceof HTMLElement)) return;
  const { target } = e;
  if (!target.classList.contains('.shadow')) {
    document.querySelector('.shadow')?.remove();
  }
  document.querySelector('.shadow')?.remove();

  const aside = tsQuerySelector(document, '.aside') || null;
  if (aside) {
    aside.style.display = '';
  }

  const userActive = tsQuerySelector(document, '.user-active');
  userActive.style.display = '';
  const burgerMenuButton = tsQuerySelector(document, '.burger-menu__button');
  burgerMenuButton.style.display = '';
};

const showBurgerMenu = (e: Event) => {
  if (!(e.target instanceof HTMLElement)) return;
  const { target } = e;
  console.log(target);

  if (target.closest('.burger-menu__button')) {
    const aside = <HTMLElement>document.querySelector('.aside');
    if (aside) {
      aside.style.display = 'block';
    }

    const userActive = tsQuerySelector(document, '.user-active');
    userActive.style.display = 'flex';

    const burgerMenuButton = tsQuerySelector(document, '.burger-menu__button');
    burgerMenuButton.style.display = 'none';

    const shadow = document.createElement('div');
    shadow.classList.add('shadow');
    document.body.append(shadow);

    shadow.classList.add('shadow-active');
    document.body.addEventListener('click', hideBurgerMenu);
  }
};

export default showBurgerMenu;
